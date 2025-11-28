import { WebSocket, RawData } from "ws";
import {
  GatewayDispatchEvents,
  GatewayReceivePayload,
  GatewaySendPayload,
  APIMessage,
} from "discord-api-types/v10";
import { TypedEmitter } from "tiny-typed-emitter";

export type TransformEvents<T> = {
  [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => void : never;
};

export interface SelfBotEvents {
  /** Fired when the WebSocket connection opens. */
  open: [];

  /** Fired when the connection closes. */
  close: [code: number, reason: Buffer];

  /** Fired when an error occurs. */
  error: [err: Error];

  /** Fired when a MESSAGE_CREATE packet is received. */
  messageCreate: [APIMessage];
}

export class SelfBot extends TypedEmitter<TransformEvents<SelfBotEvents>> {
  private ws: WebSocket;
  private seq: number | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  /** Creates a new SelfBot instance and connects to the Discord Gateway. */
  constructor(public token: string) {
    super();

    this.ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

    this.ws.on("open", () => this.onOpen());
    this.ws.on("close", (c, r) => this.onClose(c, r));
    this.ws.on("error", (e) => this.onError(e));
    this.ws.on("message", (d) => this.onMessage(d));
  }

  // ----------------------
  // WebSocket Handlers
  // ----------------------

  /** Internal: handles gateway connection open. */
  private onOpen() {
    this.emit("open");
  }

  /** Internal: handles gateway close + cleanup. */
  private onClose(code: number, reason: Buffer) {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    this.emit("close", code, reason);
  }

  /** Internal: handles WebSocket errors. */
  private onError(err: any) {
    const error = err instanceof Error ? err : new Error(String(err));
    this.emit("error", error);
  }

  /** Internal: handles all incoming raw packets. */
  private onMessage(raw: RawData) {
    const packet = JSON.parse(raw.toString()) as GatewayReceivePayload;

    if ("s" in packet && packet.s !== null) {
      this.seq = packet.s;
    }

    switch (packet.op) {
      case 10: // Hello
        this.startHeartbeat(packet.d.heartbeat_interval);
        this.identify();
        break;

      case 0: // Dispatch
        this.routeDispatch(packet);
        break;

      case 11: // Heartbeat ACK
        // noop by design
        break;
    }
  }

  // ----------------------
  // Dispatch Routing
  // ----------------------

  /** Routes all Discord dispatch events to the correct handlers. */
  private routeDispatch(packet: Extract<GatewayReceivePayload, { op: 0 }>) {
    switch (packet.t) {
      case GatewayDispatchEvents.MessageCreate:
        this.emit("messageCreate", packet.d as APIMessage);
        break;

      default:
        // Optional: emit "raw" events or extend switch-case
        break;
    }
  }

  // ----------------------
  // Identify & Heartbeat
  // ----------------------

  /** Sends the IDENTIFY payload to Discord. */
  private identify() {
    const payload: GatewaySendPayload = {
      op: 2,
      // @ts-ignore - idk vro
      d: {
        token: this.token,
        properties: {
          os: "linux",
          browser: "chrome",
          device: "pc",
        },
      },
    };

    this.send(payload);
  }

  /** Starts the heartbeat loop with the given interval. */
  private startHeartbeat(interval: number) {
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);

    this.heartbeatInterval = setInterval(() => {
      const payload: GatewaySendPayload = {
        op: 1,
        d: this.seq,
      };

      this.send(payload);
    }, interval);
  }

  // ----------------------
  // Send Wrapper
  // ----------------------

  /** Sends a payload to the Discord Gateway if the socket is open. */
  private send(payload: GatewaySendPayload) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(payload));
    }
  }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfBot = void 0;
const ws_1 = require("ws");
const v10_1 = require("discord-api-types/v10");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const REST_1 = require("./REST");
class SelfBot extends tiny_typed_emitter_1.TypedEmitter {
    token;
    rest;
    ws;
    seq = null;
    heartbeatInterval = null;
    lastHeartbeatSent = 0;
    lastPing = -1;
    constructor(token) {
        super();
        this.token = token;
        this.rest = new REST_1.REST({ token });
        this.ws = new ws_1.WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");
        this.ws.on("open", () => this.onOpen());
        this.ws.on("close", (c, r) => this.onClose(c, r));
        this.ws.on("error", (e) => this.onError(e));
        this.ws.on("message", (d) => this.onMessage(d));
    }
    onOpen() {
        this.emit("open");
    }
    onClose(code, reason) {
        if (this.heartbeatInterval)
            clearInterval(this.heartbeatInterval);
        this.emit("close", code, reason);
    }
    onError(err) {
        const error = err instanceof Error ? err : new Error(String(err));
        this.emit("error", error);
    }
    onMessage(raw) {
        const packet = JSON.parse(raw.toString());
        if ("s" in packet && packet.s !== null) {
            this.seq = packet.s;
        }
        switch (packet.op) {
            case 10:
                this.startHeartbeat(packet.d.heartbeat_interval);
                this.identify();
                break;
            case 0:
                this.routeDispatch(packet);
                break;
            case 11:
                this.lastPing = Date.now() - this.lastHeartbeatSent;
                break;
        }
    }
    routeDispatch(packet) {
        this.emit("raw", packet);
        switch (packet.t) {
            case v10_1.GatewayDispatchEvents.MessageCreate:
                this.emit("messageCreate", packet.d, packet);
                break;
            case v10_1.GatewayDispatchEvents.MessageUpdate:
                this.emit("messageUpdate", packet.d, packet);
                break;
            default:
                break;
        }
    }
    identify() {
        const payload = {
            op: 2,
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
    startHeartbeat(interval) {
        if (this.heartbeatInterval)
            clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = setInterval(() => {
            this.lastHeartbeatSent = Date.now();
            const payload = {
                op: 1,
                d: this.seq,
            };
            this.send(payload);
        }, interval);
    }
    send(payload) {
        if (this.ws.readyState === ws_1.WebSocket.OPEN) {
            this.ws.send(JSON.stringify(payload));
        }
    }
    get ping() {
        return this.lastPing;
    }
}
exports.SelfBot = SelfBot;

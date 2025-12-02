import { APIMessage } from "discord-api-types/v10";

export interface SelfBotEvents {
  /** Fired when the WebSocket connection opens. */
  open: [];

  /** Fired when the connection closes. */
  close: [code: number, reason: Buffer];

  /** Fired when an error occurs. */
  error: [err: Error];

  /** Fired when a MESSAGE_CREATE packet is received. */
  messageCreate: [APIMessage];

  /** Fired when a MESSAGE_UPDATE packet is received. */
  messageUpdate: [APIMessage];
}

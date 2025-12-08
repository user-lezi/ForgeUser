import { APIMessage, GatewayDispatchPayload } from "discord-api-types/v10";
export interface SelfBotEvents {
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    raw: [GatewayDispatchPayload];
    messageCreate: [APIMessage, GatewayDispatchPayload];
    messageUpdate: [APIMessage, GatewayDispatchPayload];
}

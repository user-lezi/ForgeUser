import { APIMessage, GatewayDispatchPayload } from "discord-api-types/v10";
export interface SelfBotEvents {
    raw: [GatewayDispatchPayload];
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    messageCreate: [APIMessage];
    messageUpdate: [APIMessage];
}

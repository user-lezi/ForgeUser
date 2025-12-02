import { APIMessage } from "discord-api-types/v10";
export interface SelfBotEvents {
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    messageCreate: [APIMessage];
    messageUpdate: [APIMessage];
}

import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { APIMessage, GatewayDispatchPayload } from "discord-api-types/v10";
export interface IForgeUserEvents {
    raw: [GatewayDispatchPayload];
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    messageCreate: [APIMessage];
    messageUpdate: [APIMessage];
}
export declare class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
    register(client: ForgeClient): void;
}

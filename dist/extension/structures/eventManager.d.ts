import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { APIMessage } from "discord-api-types/v10";
export interface IForgeUserEvents {
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    messageCreate: [APIMessage];
}
export declare class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
    register(client: ForgeClient): void;
}

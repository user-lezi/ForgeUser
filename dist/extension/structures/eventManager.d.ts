import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { APIMessage } from "discord-api-types/v10";
export interface IForgeUserEvents {
    open: [];
    messageCreate: [APIMessage];
}
export declare class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
    register(client: ForgeClient): void;
}

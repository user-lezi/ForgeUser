import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { Client, Message } from "discord.js-selfbot-v13";
export interface IForgeUserEvents {
    ready: [Client<true>];
    debug: [string];
    messageCreate: [Message];
}
export declare class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
    register(client: ForgeClient): void;
}

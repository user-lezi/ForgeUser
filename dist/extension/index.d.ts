import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { REST, SelfBot } from "../core";
import { ForgeUserCommandManager, IForgeUserEvents } from "./structures";
export interface IForgeUserOptions {
    token: string;
    events: (keyof IForgeUserEvents)[];
}
export declare class ForgeUser extends ForgeExtension {
    name: string;
    description: string;
    version: string;
    private options;
    private selfbot;
    commands: ForgeUserCommandManager;
    constructor(options?: Partial<IForgeUserOptions>);
    init(client: ForgeClient): void;
    get bot(): SelfBot;
    get rest(): REST;
}
export type ForgeUserEventType = keyof IForgeUserEvents;

import { ForgeClient, ForgeExtension } from "@tryforge/forgescript";
import { SelfBot } from "../core";
import { ForgeUserCommandManager } from "./structures/commandManager";
import { IForgeUserEvents } from "./structures/eventManager";
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
}

import { ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript";
import { Client, ClientOptions, Message } from "discord.js-selfbot-v13";
import { IForgeUserEvents } from "./structures/eventManager";
import { ForgeUserCommandManager } from "./structures/commandManager";
export interface IRawForgeUserOptions {
    clientOptions: ClientOptions;
    token: string;
    prefixes?: string[];
    prefixCaseInsensitive?: boolean;
    allowBots?: boolean;
    respondOnEdit?: number | boolean;
    events: (keyof IForgeUserEvents)[];
}
export interface IForgeUserOptions extends Omit<IRawForgeUserOptions, "prefixes"> {
    prefixes: IExtendedCompilationResult[];
}
export declare class ForgeUser extends ForgeExtension {
    #private;
    name: string;
    description: string;
    version: string;
    options: Required<IForgeUserOptions>;
    userClient: Client;
    commands: ForgeUserCommandManager;
    constructor(options?: Partial<IRawForgeUserOptions>);
    init(client: ForgeClient): void;
    login(): Promise<string>;
    getPrefix(msg: Message): Promise<string | null>;
}

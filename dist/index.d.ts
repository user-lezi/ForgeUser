import { ForgeClient, ForgeExtension, IExtendedCompilationResult } from "@tryforge/forgescript";
import { Client, ClientOptions, Message } from "discord.js-selfbot-v13";
import { IForgeUserEvents } from "./structures/eventManager";
import { ForgeUserCommandManager } from "./structures/commandManager";
import { IToken, TokenManager } from "./structures/tokenManager";
export interface IRawForgeUserOptions {
    clientOptions: ClientOptions;
    doNotLogin?: boolean;
    clearInvalidTokens?: boolean;
    prefixes?: string[];
    prefixCaseInsensitive?: boolean;
    allowBots?: boolean;
    respondOnEdit?: number | boolean;
    events: (keyof IForgeUserEvents)[];
}
export interface IForgeUserOptions extends Omit<IRawForgeUserOptions, "prefixes"> {
    prefixes: IExtendedCompilationResult[];
}
interface IOnlyToken {
    token: string;
}
export declare class ForgeUser extends ForgeExtension {
    #private;
    name: string;
    description: string;
    version: string;
    options: Required<IForgeUserOptions>;
    userClient: Client;
    commands: ForgeUserCommandManager;
    tokens: TokenManager;
    constructor(options?: Partial<IRawForgeUserOptions & IOnlyToken>);
    init(client: ForgeClient): void;
    login(nameOrToken?: string): Promise<void>;
    switchAccount(nameOrToken: string): Promise<void>;
    get currentToken(): IToken | null;
    getPrefix(msg: Message): Promise<string | null>;
}
export * from "./structures";

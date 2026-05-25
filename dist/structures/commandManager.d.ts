import { BaseCommandManager } from "@tryforge/forgescript";
import { IForgeUserEvents } from "./eventManager";
export declare class ForgeUserCommandManager extends BaseCommandManager<keyof IForgeUserEvents> {
    handlerName: string;
}

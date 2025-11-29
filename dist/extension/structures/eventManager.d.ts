import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
export interface IForgeUserEvents {
    open: [];
}
export declare class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
    register(client: ForgeClient): void;
}

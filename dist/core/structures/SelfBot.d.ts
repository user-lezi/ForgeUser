import { TypedEmitter } from "tiny-typed-emitter";
import { ISelfbotUser, SelfBotEvents } from "../types";
import { REST } from "./REST";
type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => void : never;
};
export declare class SelfBot extends TypedEmitter<TransformEvents<SelfBotEvents>> {
    token: string;
    rest: REST;
    private ws;
    private seq;
    private heartbeatInterval;
    private lastHeartbeatSent;
    private lastPing;
    constructor(token: string);
    private onOpen;
    private onClose;
    private onError;
    private onMessage;
    private routeDispatch;
    private identify;
    private startHeartbeat;
    private send;
    get ping(): number;
    me(force?: boolean): Promise<ISelfbotUser>;
}
export {};

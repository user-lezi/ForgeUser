import { TypedEmitter } from "tiny-typed-emitter";
import { SelfBotEvents } from "./types";
type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => void : never;
};
export declare class SelfBot extends TypedEmitter<TransformEvents<SelfBotEvents>> {
    token: string;
    private ws;
    private seq;
    private heartbeatInterval;
    constructor(token: string);
    private onOpen;
    private onClose;
    private onError;
    private onMessage;
    private routeDispatch;
    private identify;
    private startHeartbeat;
    private send;
}
export {};

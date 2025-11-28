import { APIMessage } from "discord-api-types/v10";
import { TypedEmitter } from "tiny-typed-emitter";
export type TransformEvents<T> = {
    [P in keyof T]: T[P] extends any[] ? (...args: T[P]) => void : never;
};
export interface SelfBotEvents {
    open: [];
    close: [code: number, reason: Buffer];
    error: [err: Error];
    messageCreate: [APIMessage];
}
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

import { GatewayDispatchPayload } from "discord-api-types/v10";
export declare enum PacketProperty {
    event = "event",
    opcode = "opcode",
    seq = "seq",
    data = "data"
}
export declare const PacketProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof PacketProperty, GatewayDispatchPayload>;

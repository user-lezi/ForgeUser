"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const packet_1 = require("../../properties/packet");
exports.default = new forgescript_1.NativeFunction({
    name: "$gatewayDispatchPayload",
    version: "1.0.0",
    aliases: ["$packet"],
    description: "Reads properties from the incoming gateway dispatch packet.",
    unwrap: true,
    brackets: false,
    output: forgescript_1.ArgType.Unknown,
    args: [forgescript_1.Arg.optionalEnum(packet_1.PacketProperty, "property", "The property to pull.")],
    async execute(ctx, [prop]) {
        const packet = ctx.runtime.extras;
        if (!packet)
            return this.customError("No gateway packet available.");
        if (!prop) {
            return this.successJSON(packet);
        }
        const value = packet_1.PacketProperties[prop](packet);
        return prop === "data" ? this.successJSON(value) : this.success(value);
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const message_1 = require("../../properties/message");
const v10_1 = require("discord-api-types/v10");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserMessage",
    description: "Retrieves data from MESSAGE_CREATE or MESSAGE_UPDATE packets.",
    unwrap: true,
    brackets: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.optionalEnum(message_1.MessageProperty, "property", "The property to pull."),
        forgescript_1.Arg.optionalString("separator", "Separator to use for array values."),
    ],
    async execute(ctx, [prop, sep]) {
        const packet = ctx.runtime.extras;
        if (!packet)
            return this.customError("No gateway packet in context.");
        if (packet.t !== v10_1.GatewayDispatchEvents.MessageCreate &&
            packet.t !== v10_1.GatewayDispatchEvents.MessageUpdate) {
            return this.customError("Packet is not a message event.");
        }
        if (!prop)
            return this.successJSON(packet.d);
        return this.success(message_1.MessageProperties[prop](packet.d, sep));
    },
});

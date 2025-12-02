"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const message_1 = require("../../properties/message");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserMessage",
    description: "Retrieves data of a message",
    unwrap: true,
    brackets: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    args: [
        forgescript_1.Arg.optionalEnum(message_1.MessageProperty, "property", "The property to pull"),
        forgescript_1.Arg.optionalString("sepearator", "Separator to use in case of array"),
    ],
    async execute(ctx, [prop, sep]) {
        if (!prop)
            return this.successJSON(ctx.runtime.extras);
        return this.success(message_1.MessageProperties[prop](ctx.runtime.extras, sep));
    },
});

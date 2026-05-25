"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const message_1 = require("../../properties/message");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotMessage",
    description: "Returns the message provided to selfbot user.",
    aliases: ["$getSelfbotMessage"],
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.optionalEnum(message_1.MessageProperty, "property", "The property to pull."),
        forgescript_1.Arg.optionalString("separator", "Separator to use for array values."),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [prop, sep]) {
        let message = (0, helpers_1.getSelfbotEnv)(ctx, "message");
        if (!message)
            return this.success();
        if (!prop)
            return this.successJSON(ctx.args.join(" "));
        return this.success(message_1.MessageProperties[prop](message, sep));
    },
});

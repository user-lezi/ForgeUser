"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const messageAuthor_1 = require("../../properties/messageAuthor");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotMessageAuthor",
    description: "Returns the message's author provided to selfbot user.",
    aliases: ["$getSelfbotMessageAuthor"],
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.optionalEnum(messageAuthor_1.MessageAuthorProperty, "property", "The property to pull."),
        forgescript_1.Arg.optionalString("separator", "Separator to use for array values."),
    ],
    output: forgescript_1.ArgType.String,
    execute(ctx, [prop, sep]) {
        let message = (0, helpers_1.getSelfbotEnv)(ctx, "message");
        if (!message)
            return this.success();
        if (!prop)
            return this.successJSON(message.author.id);
        return this.success(messageAuthor_1.MessageAuthorProperties[prop](message.author, sep));
    },
});

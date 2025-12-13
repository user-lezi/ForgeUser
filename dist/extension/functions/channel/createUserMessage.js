"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$createUserMessage",
    aliases: ["$sendUserMessage"],
    description: "Sends a message using the user account (selfbot).",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelID", "The channel ID to send the message to."),
        forgescript_1.Arg.requiredString("content", "The message content."),
        forgescript_1.Arg.optionalBoolean("returnID", "Whether to return just the message ID."),
    ],
    version: "1.0.1",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [channelID, content, returnId]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        if (!channelID || !/^\d{17,20}$/.test(channelID))
            return this.customError("Invalid channel ID.");
        if (!content || !content.trim())
            return this.customError("Message content cannot be empty.");
        try {
            const data = await rest.post(`/channels/${channelID}/messages`, { content });
            if (returnId)
                return this.success(data.id);
            return this.successJSON(data);
        }
        catch (err) {
            const msg = err?.message ?? err?.error ?? "Failed to send message.";
            return this.customError(msg);
        }
    },
});

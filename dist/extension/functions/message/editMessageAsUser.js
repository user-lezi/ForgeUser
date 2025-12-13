"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$editMessageAsUser",
    aliases: ["$editUserMessage", "$updateUserMessage"],
    description: "Edits a message sent by the user account (selfbot).",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelID", "The channel ID containing the message."),
        forgescript_1.Arg.requiredString("messageID", "The message ID to edit."),
        forgescript_1.Arg.requiredString("content", "New message content."),
        forgescript_1.Arg.optionalBoolean("returnID", "Whether to return the message ID."),
    ],
    version: "1.0.1",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [channelID, messageID, content, returnId]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        if (!/^\d{17,20}$/.test(channelID))
            return this.customError("Invalid channel ID.");
        if (!/^\d{17,20}$/.test(messageID))
            return this.customError("Invalid message ID.");
        if (!content || !content.trim())
            return this.customError("Message content cannot be empty.");
        try {
            const data = await rest.patch(`/channels/${channelID}/messages/${messageID}`, { content });
            if (returnId)
                return this.success(data.id);
            return this.successJSON(data);
        }
        catch (err) {
            const msg = err?.message ?? err?.error ?? "Failed to edit message.";
            return this.customError(msg);
        }
    },
});

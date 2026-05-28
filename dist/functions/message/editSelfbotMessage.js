"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$editSelfbotMessage",
    description: "Edits message using selfbot.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channel ID", "The channel to edit this message"),
        forgescript_1.Arg.requiredString("messageId", "The message to edit"),
        forgescript_1.Arg.optionalString("content", "The content for the message"),
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [channelId, messageId, content]) {
        ctx.container.content = content ?? undefined;
        const options = ctx.container.getOptions();
        if (!ctx.container.isValidMessage(options)) {
            return this.customError("Invalid Message.");
        }
        if ("embeds" in options && options.embeds?.length > 0) {
            return this.customError("Selfbots cannot send embeds.");
        }
        if ("components" in options && options.components?.length > 0) {
            return this.customError("Selfbots cannot send components (buttons, select menus, etc.).");
        }
        try {
            const message = await helpers_1.ViaSelfbot.getMessage((0, helpers_1.getSelfbotClient)(ctx), channelId, messageId);
            if (message) {
                const msg = await message.edit(options);
                ctx.container.reset();
                return this.success(!!msg);
            }
            throw new Error("Couldnt find the message");
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

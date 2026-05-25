"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$sendSelfbotMessage",
    description: "Sends message using selfbot.",
    aliases: ["$createSelfbotMessage"],
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.requiredString("channel ID", "The channel to send this message to"),
        forgescript_1.Arg.optionalString("content", "The content for the message"),
        forgescript_1.Arg.optionalBoolean("return message ID", "Whether to return the message id of the newly sent message"),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [channelId, content, returnMessageID]) {
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
            const channel = await helpers_1.ViaSelfbot.getChannel((0, helpers_1.getSelfbotClient)(ctx), channelId);
            if (channel && channel.isText()) {
                const msg = await channel.send(options);
                ctx.container.reset();
                return this.success(returnMessageID ? msg?.id : undefined);
            }
            throw new Error("Invalid Channel");
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

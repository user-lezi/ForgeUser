"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotForward",
    description: "Forwards a message to another channel, returns bool",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelId", "The channel where the message is located."),
        forgescript_1.Arg.requiredString("messageId", "The message to forward"),
        forgescript_1.Arg.optionalString("channelId", "The channel to forward message to"),
    ],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [_channelId, messageId, channelId]) {
        try {
            let client = (0, helpers_1.getSelfbotClient)(ctx);
            let message = (await helpers_1.ViaSelfbot.getMessage(client, _channelId, messageId)) ?? (0, helpers_1.getSelfbotEnv)(ctx, "message");
            if (!message)
                return this.customError("No message found");
            let channel = null;
            if (channelId) {
                channel = await helpers_1.ViaSelfbot.getChannel(client, channelId);
            }
            channel ??= message.channel;
            if (!channel.isText())
                return this.customError("Invalid Channel Type");
            return this.success(!!(await message.forward(channel).catch(ctx.noop)));
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

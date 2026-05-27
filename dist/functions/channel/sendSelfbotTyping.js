"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$sendSelfbotTyping",
    description: "Sends typing status using selfbot.",
    aliases: ["$startSelfbotTyping"],
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("channel ID", "The channel to send typing status to.")],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [channelId]) {
        try {
            channelId ??= (0, helpers_1.getSelfbotEnv)(ctx, "message")?.channelId ?? null;
            if (!channelId)
                return this.customError("Couldnt find channel");
            const channel = await helpers_1.ViaSelfbot.getChannel((0, helpers_1.getSelfbotClient)(ctx), channelId);
            if (channel && channel.isText()) {
                channel.sendTyping();
                return this.success();
            }
            throw new Error("Invalid Channel");
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

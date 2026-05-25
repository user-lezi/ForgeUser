"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$sendSlashCommand",
    description: "Sends slash command using selfbot.",
    aliases: ["$useSlashCommand"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channel ID", "The channel to send slasg command to"),
        forgescript_1.Arg.requiredUser("bot ID", "The bot ID"),
        forgescript_1.Arg.requiredString("command name", "The name of slash command"),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [channelId, bot, name]) {
        try {
            const channel = await helpers_1.ViaSelfbot.getChannel((0, helpers_1.getSelfbotClient)(ctx), channelId);
            if (channel && channel.isText()) {
                let response = await channel.sendSlash(bot.id, name);
                if (response.isMessage) {
                    return this.success(response.id);
                }
                return this.customError("Modal not Supported yet");
            }
            throw new Error("Invalid Channel");
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

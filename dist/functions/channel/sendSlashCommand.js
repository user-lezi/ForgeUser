"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashOptionsManagerKey = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
const slashOptionsManager_1 = require("../../structures/slashOptionsManager");
exports.SlashOptionsManagerKey = "$SO_manager";
exports.default = new forgescript_1.NativeFunction({
    name: "$sendSlashCommand",
    description: "Sends slash command using selfbot.",
    aliases: ["$useSlashCommand", "$useSlash"],
    version: "1.0.0",
    unwrap: false,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channel ID", "The channel to send slasg command to"),
        forgescript_1.Arg.requiredUser("bot ID", "The bot ID"),
        forgescript_1.Arg.requiredString("command name", "The name of slash command"),
        forgescript_1.Arg.restString("slash options", "Set the slash options"),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx) {
        try {
            if (!this.data.fields)
                this.data.fields = [];
            const options = await this["resolveMultipleArgs"](ctx, 0, 1, 2);
            let [channelId, bot, name] = options.args;
            const r = options.return;
            if (!r?.success)
                return r;
            ctx.setEnvironmentKey(exports.SlashOptionsManagerKey, new slashOptionsManager_1.SlashOptionsManager());
            for (let i = 3; i < this.data.fields.length; i++) {
                const r = await this["resolveCode"](ctx, this.data.fields[i]);
                if (!r?.success)
                    return r;
            }
            const channel = await helpers_1.ViaSelfbot.getChannel((0, helpers_1.getSelfbotClient)(ctx), channelId);
            if (channel && channel.isText()) {
                const manager = ctx.getEnvironmentInstance(slashOptionsManager_1.SlashOptionsManager, exports.SlashOptionsManagerKey);
                const options = manager.getByOrder().map((x) => x.value);
                const response = await channel.sendSlash(bot.id, name, ...options);
                ctx.deleteEnvironmentKey(exports.SlashOptionsManagerKey);
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

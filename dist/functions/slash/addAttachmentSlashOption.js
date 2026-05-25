"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const slashOptionsManager_1 = require("../../structures/slashOptionsManager");
const sendSlashCommand_1 = require("../channel/sendSlashCommand");
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
exports.default = new forgescript_1.NativeFunction({
    name: "$addAttachmentSlashOption",
    description: "Add an attachment slash command options.",
    aliases: ["$attachmentSlashOption", "$setAttachmentSlashOption"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The option name"), forgescript_1.Arg.optionalString("path", "the option value")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [name, path]) {
        let manager = ctx.getEnvironmentInstance(slashOptionsManager_1.SlashOptionsManager, sendSlashCommand_1.SlashOptionsManagerKey);
        if (!manager)
            return this.customError("Run this in $sendSlashCommand[] function.");
        let value = undefined;
        if (path) {
            value = new discord_js_selfbot_v13_1.MessageAttachment(path);
        }
        manager.add(name, value);
        return this.success(true);
    },
});

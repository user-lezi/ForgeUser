"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const slashOptionsManager_1 = require("../../structures/slashOptionsManager");
const sendSlashCommand_1 = require("../channel/sendSlashCommand");
exports.default = new forgescript_1.NativeFunction({
    name: "$setSlashOptionsOrder",
    description: "Sets the slash command options order.",
    aliases: ["$setSlashOrder", "$slashOptionsOrder"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.restString("option names", "The option names")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [names]) {
        let manager = ctx.getEnvironmentInstance(slashOptionsManager_1.SlashOptionsManager, sendSlashCommand_1.SlashOptionsManagerKey);
        if (!manager)
            return this.customError("Run this in $sendSlashCommand[] function.");
        manager.setOrder(...names);
        return this.success(true);
    },
});

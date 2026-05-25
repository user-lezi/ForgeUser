"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const slashOptionsManager_1 = require("../../structures/slashOptionsManager");
const sendSlashCommand_1 = require("../channel/sendSlashCommand");
exports.default = new forgescript_1.NativeFunction({
    name: "$addNumberSlashOption",
    description: "Add a number slash command options.",
    aliases: ["$numberSlashOption", "$setNumberSlashOption"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The option name"), forgescript_1.Arg.optionalNumber("value", "the option value")],
    output: forgescript_1.ArgType.Boolean,
    execute(ctx, [name, value]) {
        let manager = ctx.getEnvironmentInstance(slashOptionsManager_1.SlashOptionsManager, sendSlashCommand_1.SlashOptionsManagerKey);
        if (!manager)
            return this.customError("Run this in $sendSlashCommand[] function.");
        manager.add(name, value ?? undefined);
        return this.success(true);
    },
});

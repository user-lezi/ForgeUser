"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$installUserApp",
    description: "Installs User Application.",
    aliases: ["$installUserBot"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredUser("app ID", "Application ID")],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [app]) {
        let client = (0, helpers_1.getSelfbotClient)(ctx);
        if (!app.bot)
            return this.customError("Not an application");
        await client.installUserApps(app.id);
        return this.success(app.id);
    },
});

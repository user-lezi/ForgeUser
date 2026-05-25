"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$acceptGuildInvite",
    description: "Joins a guild using guild's invite code",
    aliases: ["$joinGuild", "$joinServer"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("invite", "Guild's invite code"),
        forgescript_1.Arg.optionalBoolean("bypassOnboarding", "Whether to bypass onboarding"),
        forgescript_1.Arg.optionalBoolean("bypassVerify", "Whether to bypass rule screening"),
    ],
    output: [forgescript_1.ArgType.Channel, forgescript_1.ArgType.Guild],
    async execute(ctx, [invite, bypassOnboarding, bypassVerify]) {
        try {
            let client = (0, helpers_1.getSelfbotClient)(ctx);
            if (!client.options.captchaSolver)
                return this.customError("No captcha solver is passed.");
            return this.success((await client.acceptInvite(invite, {
                bypassOnboarding: bypassOnboarding ?? true,
                bypassVerify: bypassVerify ?? true,
            })).id);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

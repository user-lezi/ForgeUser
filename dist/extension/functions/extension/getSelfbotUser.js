"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getSelfbotUser",
    aliases: ["$me", "$selfbotUser"],
    description: "Returns the selfbot user information.",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalBoolean("force", "Forcefully fetch the information.")],
    version: "1.0.0",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [force]) {
        try {
            const data = await ctx.client
                .getExtension(__1.ForgeUser, true)
                .bot.me(force ?? false);
            return this.successJSON(data);
        }
        catch (err) {
            const msg = err?.message ?? err?.error ?? "Failed to send message.";
            return this.customError(msg);
        }
    },
});

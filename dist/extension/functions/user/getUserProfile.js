"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserProfile",
    description: "Fetches a Discord user's profile (banner, bio, accent color, etc.)",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("id", "The user's id."),
        forgescript_1.Arg.optionalBoolean("force", "Forcefully fetch the information."),
    ],
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    async execute(ctx, [id, force]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        try {
            const data = await rest.get(`/users/${id}/profile`, {
                force: force == null ? false : force,
            });
            return this.successJSON(data);
        }
        catch (err) {
            return this.customError(`REST Error: ${err}`);
        }
    },
});

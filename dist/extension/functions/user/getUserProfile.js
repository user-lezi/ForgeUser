"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const userProfile_1 = require("../../properties/userProfile");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserProfile",
    description: "Fetches a Discord user's profile (banner, bio, accent color, etc.)",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("id", "The user's id."),
        forgescript_1.Arg.optionalBoolean("force", "Forcefully fetch the information."),
        forgescript_1.Arg.optionalEnum(userProfile_1.UserProfileProperty, "property", "The property to pull."),
        forgescript_1.Arg.optionalString("separator", "Separator to use in case of array"),
    ],
    version: "1.0.0",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [id, force, prop, sep]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        try {
            const data = await rest.get(`/users/${id}/profile`, {
                force: force == null ? false : force,
            });
            if (!prop)
                return this.successJSON(data);
            return this.success(userProfile_1.UserProfileProperties[prop](data, sep ?? ", "));
        }
        catch (err) {
            return this.customError(err);
        }
    },
});

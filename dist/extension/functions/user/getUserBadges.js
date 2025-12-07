"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const userBadge_1 = require("../../properties/userBadge");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserBadges",
    description: "Fetches a user's badges.",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("id", "The user's id."),
        forgescript_1.Arg.optionalEnum(userBadge_1.UserBadgeProperty, "property", "The property to pull."),
        forgescript_1.Arg.optionalString("separator", "Separator to use in case of array."),
    ],
    version: "1.0.0",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [userId, property, sep]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        try {
            const data = await rest.get(`/users/${userId}/profile`);
            if (!property)
                return this.successJSON(data.badges);
            return this.success(userBadge_1.UserBadgeProperties[property](data, sep ?? ", "));
        }
        catch (err) {
            return this.customError(`REST Error: ${err}`);
        }
    },
});

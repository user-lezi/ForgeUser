"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$addUserToken",
    description: "Registers a token into the manager at runtime.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("token", "The token to register."),
        forgescript_1.Arg.optionalString("name", "Optional name for this token."),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [token, name]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            extension.tokens.add(token, name || undefined);
            return this.success(extension.tokens.get(token).name);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

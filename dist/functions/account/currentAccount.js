"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const account_1 = require("../../properties/account");
exports.default = new forgescript_1.NativeFunction({
    name: "$currentAccount",
    description: "Returns the name of the currently logged in account.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalEnum(account_1.AccountTokenProperty, "property", "The property to pull.")],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [prop]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            const token = extension.currentToken;
            if (!token)
                return this.customError("No account is currently logged in.");
            return this.success(account_1.AccountTokenProperties[prop ?? "name"](token));
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

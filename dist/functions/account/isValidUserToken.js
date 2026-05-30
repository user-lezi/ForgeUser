"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$isValidUserToken",
    description: "Validates a token by name, or the current account if no name is given.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("name", "The name or token to validate. Defaults to the current account.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [nameOrToken]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            const target = nameOrToken || extension.currentToken?.token;
            if (!target)
                return this.customError("No account is currently logged in.");
            return this.success(await extension.tokens.validate(target));
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

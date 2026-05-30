"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$removeUserToken",
    description: "Removes a token from the manager at runtime.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The name or token to remove.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [nameOrToken]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            if (extension.currentToken?.name === extension.tokens.get(nameOrToken)?.name)
                return this.customError("Cannot remove the currently active token.");
            return this.success(extension.tokens.remove(nameOrToken));
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

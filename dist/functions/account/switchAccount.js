"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$switchAccount",
    description: "Switches the selfbot to a different account by name or token.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredString("name", "The name or token of the account to switch to.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [nameOrToken]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            await extension.switchAccount(nameOrToken);
            return this.success(true);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

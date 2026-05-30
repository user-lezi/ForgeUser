"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$login",
    description: "Logs into a Discord account via the selfbot client.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("name", "The name or token to login with. Defaults to the first registered token.")],
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx, [nameOrToken]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            if (nameOrToken) {
                await extension.switchAccount(nameOrToken);
            }
            else {
                await extension.login();
            }
            return this.success(true);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

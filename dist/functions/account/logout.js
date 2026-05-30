"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$logout",
    description: "Logs out of the current selfbot account.",
    version: "1.0.0",
    unwrap: true,
    output: forgescript_1.ArgType.Boolean,
    async execute(ctx) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            if (extension.currentToken)
                await extension.userClient.logout();
            return this.success(true);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

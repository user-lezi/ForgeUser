"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const accountList_1 = require("./accountList");
exports.default = new forgescript_1.NativeFunction({
    name: "$accountCount",
    description: "Returns the total number of registered tokens.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalEnum(accountList_1.AccountFilter, "filter", "Whether valid or invalid")],
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [filter]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            const filterMap = {
                valid: true,
                invalid: false,
            };
            const validity = filter ? filterMap[filter] : undefined;
            return this.success(extension.tokens.all(validity).length);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

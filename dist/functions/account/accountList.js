"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountFilter = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
var AccountFilter;
(function (AccountFilter) {
    AccountFilter["Valid"] = "valid";
    AccountFilter["Invalid"] = "invalid";
})(AccountFilter || (exports.AccountFilter = AccountFilter = {}));
exports.default = new forgescript_1.NativeFunction({
    name: "$accountList",
    description: "Returns all registered account names, optionally filtered by validity.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [
        forgescript_1.Arg.optionalEnum(AccountFilter, "filter", "Whether valid or invalid"),
        forgescript_1.Arg.optionalString("separator", "The separator between names."),
    ],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [filter, separator = ", "]) {
        try {
            const extension = ctx.getExtension(__1.ForgeUser, true);
            const filterMap = {
                valid: true,
                invalid: false,
            };
            const validity = filter ? filterMap[filter] : undefined;
            const accounts = extension.tokens.all(validity).map((x) => x.name);
            if (!accounts.length)
                return this.success();
            return this.success(accounts.join(separator ?? ", "));
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

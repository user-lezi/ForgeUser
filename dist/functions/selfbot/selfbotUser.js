"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotUser",
    description: "Returns the selfbot user.",
    aliases: ["$me"],
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("variable", "Load the user object into a variable")],
    output: forgescript_1.ArgType.Json,
    execute(ctx, [variable]) {
        let user = (0, helpers_1.getSelfbotClient)(ctx).user;
        if (!variable)
            return this.successJSON(user);
        ctx.setEnvironmentKey(variable, user);
        return this.success();
    },
});

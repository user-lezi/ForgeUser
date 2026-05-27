"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotEmail",
    description: "Returns the selfbot email.",
    version: "1.0.0",
    unwrap: true,
    output: forgescript_1.ArgType.String,
    execute(ctx) {
        let user = (0, helpers_1.getSelfbotClient)(ctx).user;
        return this.success(user.email);
    },
});

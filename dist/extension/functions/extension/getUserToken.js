"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$getUserToken",
    description: "Returns the provided user token from the selfbot configuration.",
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.String,
    async execute(ctx) {
        return this.success(ctx.client.getExtension(__1.ForgeUser, true).bot.token);
    },
});

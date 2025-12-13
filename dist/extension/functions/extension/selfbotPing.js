"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotPing",
    aliases: ["$userPing"],
    description: "Returns the current SelfBot WebSocket ping (ms).",
    unwrap: true,
    version: "1.0.0",
    output: forgescript_1.ArgType.Number,
    async execute(ctx) {
        return this.success(ctx.client.getExtension(__1.ForgeUser, true).bot.ping);
    },
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotPing",
    description: "Returns the selfbot ws ping.",
    version: "1.0.0",
    unwrap: true,
    output: forgescript_1.ArgType.Number,
    execute(ctx) {
        let client = (0, helpers_1.getSelfbotClient)(ctx);
        return this.success(client.ws.ping);
    },
});

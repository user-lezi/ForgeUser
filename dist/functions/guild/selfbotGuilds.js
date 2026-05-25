"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotGuilds",
    description: "Returns the selfbot's guild list.",
    version: "1.0.0",
    unwrap: true,
    brackets: false,
    args: [forgescript_1.Arg.optionalString("separator", "Separator to join the list")],
    output: forgescript_1.ArgType.String,
    execute(ctx, [sep]) {
        let client = (0, helpers_1.getSelfbotClient)(ctx);
        return this.success(client.guilds.cache.map((x) => x.id).join(sep ?? ", "));
    },
});

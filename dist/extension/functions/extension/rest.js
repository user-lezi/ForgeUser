"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
exports.default = new forgescript_1.NativeFunction({
    name: "$rest",
    description: "Send API Request to Discord API.",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("route", "Route to request."),
        forgescript_1.Arg.requiredString("method", "Route method, like so `get`"),
        forgescript_1.Arg.optionalJson("body", "Body has to be json"),
    ],
    version: "1.0.0",
    output: forgescript_1.ArgType.Unknown,
    async execute(ctx, [route, method, body]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        try {
            return this.successFormatted(await rest[method.toLowerCase()](route, body ?? undefined));
        }
        catch (err) {
            return this.customError(`REST Error: ${err}`);
        }
    },
});

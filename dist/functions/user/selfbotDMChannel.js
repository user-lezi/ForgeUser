"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotDMChannel",
    description: "Gets DM channel with a user using selfbot.",
    aliases: ["$createSelfbotDMChannel"],
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [forgescript_1.Arg.requiredUser("user ID", "User to send this message to")],
    output: forgescript_1.ArgType.String,
    async execute(ctx, [user]) {
        try {
            const channel = await helpers_1.ViaSelfbot.getDMChannel((0, helpers_1.getSelfbotClient)(ctx), user.id);
            if (channel) {
                return this.success(channel.id);
            }
            throw new Error(`Couldnt get DM Channel with ${user}`);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

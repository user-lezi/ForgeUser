"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$selfbotReact",
    description: "Adds reactions to a message, returns amount of emojis successfully reacted",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelId", "The channel where the message is located."),
        forgescript_1.Arg.requiredString("messageId", "The message ID"),
        forgescript_1.Arg.restString("emojis; burst", "The emojis to react with; Super Reactions"),
    ],
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [channelId, messageId, emojis]) {
        try {
            let _burst = emojis.pop();
            let burst = false;
            if (_burst) {
                if (_burst?.toLowerCase() == "true" || _burst?.toLowerCase() == "false")
                    burst = _burst == "true";
                else
                    emojis.push(_burst);
            }
            let client = (0, helpers_1.getSelfbotClient)(ctx);
            let message = (await helpers_1.ViaSelfbot.getMessage(client, channelId, messageId)) ?? (0, helpers_1.getSelfbotEnv)(ctx, "message");
            if (!message)
                return this.customError("No message found");
            let count = 0;
            for (const emoji of emojis) {
                const success = await message.react(emoji, burst).catch(ctx.noop);
                if (success)
                    count++;
            }
            return this.success(count);
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

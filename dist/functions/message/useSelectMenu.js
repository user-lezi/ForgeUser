"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$useSelectMenu",
    description: "Uses selct menu using its custom ID.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("customId", "The custom ID of the menu."),
        forgescript_1.Arg.requiredString("channelId", "The channel where the message is located."),
        forgescript_1.Arg.requiredString("messageId", "The message ID"),
        forgescript_1.Arg.restString("values", "The select menu values"),
    ],
    output: forgescript_1.ArgType.Message,
    async execute(ctx, [customId, channelId, messageId, values]) {
        try {
            let client = (0, helpers_1.getSelfbotClient)(ctx);
            let message = (await helpers_1.ViaSelfbot.getMessage(client, channelId, messageId)) ?? (0, helpers_1.getSelfbotEnv)(ctx, "message");
            if (!message)
                return this.customError("No message found");
            const response = await message.selectMenu(customId, values);
            if (response.isMessage) {
                return this.success(response.id);
            }
            return this.customError("Modal not Supported yet");
        }
        catch (error) {
            return this.customError(error.message);
        }
    },
});

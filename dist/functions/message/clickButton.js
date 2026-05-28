"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const helpers_1 = require("../../helpers");
exports.default = new forgescript_1.NativeFunction({
    name: "$clickButton",
    description: "Click a specified button in the message using the button's custom ID.",
    version: "1.0.0",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("customId", "The custom ID of the button."),
        forgescript_1.Arg.optionalString("channelId", "The channel where the message is located."),
        forgescript_1.Arg.optionalString("messageId", "The message ID"),
    ],
    output: forgescript_1.ArgType.Message,
    async execute(ctx, [customId, channelId, messageId]) {
        try {
            let client = (0, helpers_1.getSelfbotClient)(ctx);
            let message = (0, helpers_1.getSelfbotEnv)(ctx, "message");
            if (channelId && messageId) {
                message = await helpers_1.ViaSelfbot.getMessage(client, channelId, messageId);
            }
            if (!message)
                return this.customError("No message found");
            const response = await message.clickButton(customId);
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

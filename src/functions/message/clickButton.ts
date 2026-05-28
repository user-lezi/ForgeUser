import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient, getSelfbotEnv, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$clickButton",
  description: "Click a specified button in the message using the button's custom ID.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("customId", "The custom ID of the button."),
    Arg.optionalString("channelId", "The channel where the message is located."),
    Arg.optionalString("messageId", "The message ID"),
  ],
  output: ArgType.Message,
  async execute(ctx, [customId, channelId, messageId]) {
    try {
      let client = getSelfbotClient(ctx)

      let message = getSelfbotEnv(ctx, "message")
      if (channelId && messageId) {
        message = await ViaSelfbot.getMessage(client, channelId, messageId)
      }

      if (!message) return this.customError("No message found")

      const response = await message.clickButton(customId)
      if (response.isMessage) {
        return this.success(response.id)
      }
      return this.customError("Modal not Supported yet")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient, getSelfbotEnv, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$useSelectMenu",
  description: "Uses selct menu using its custom ID.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("customId", "The custom ID of the menu."),
    Arg.requiredString("channelId", "The channel where the message is located."),
    Arg.requiredString("messageId", "The message ID"),
    Arg.restString("values", "The select menu values"),
  ],
  output: ArgType.Message,
  async execute(ctx, [customId, channelId, messageId, values]) {
    try {
      let client = getSelfbotClient(ctx)

      let message = (await ViaSelfbot.getMessage(client, channelId, messageId)) ?? getSelfbotEnv(ctx, "message")

      if (!message) return this.customError("No message found")

      const response = await message.selectMenu(customId, values)
      if (response.isMessage) {
        return this.success(response.id)
      }
      return this.customError("Modal not Supported yet")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

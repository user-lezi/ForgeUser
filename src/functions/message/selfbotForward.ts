import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient, getSelfbotEnv, ViaSelfbot } from "../../helpers"
import { AnyChannel } from "discord.js-selfbot-v13"

export default new NativeFunction({
  name: "$selfbotForward",
  description: "Forwards a message to another channel, returns bool",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("channelId", "The channel where the message is located."),
    Arg.requiredString("messageId", "The message to forward"),
    Arg.optionalString("channelId", "The channel to forward message to"),
  ],
  output: ArgType.Boolean,
  async execute(ctx, [_channelId, messageId, channelId]) {
    try {
      let client = getSelfbotClient(ctx)

      let message = (await ViaSelfbot.getMessage(client, _channelId, messageId)) ?? getSelfbotEnv(ctx, "message")

      if (!message) return this.customError("No message found")

      let channel: AnyChannel | null = null
      if (channelId) {
        channel = await ViaSelfbot.getChannel(client, channelId)
      }
      channel ??= message.channel

      if (!channel.isText()) return this.customError("Invalid Channel Type")

      return this.success(!!(await message.forward(channel).catch(ctx.noop)))
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

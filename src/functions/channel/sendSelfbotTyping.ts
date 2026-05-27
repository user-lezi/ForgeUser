import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { TextChannel } from "discord.js-selfbot-v13"
import { getSelfbotClient, getSelfbotEnv, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$sendSelfbotTyping",
  description: "Sends typing status using selfbot.",
  aliases: ["$startSelfbotTyping"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("channel ID", "The channel to send typing status to.")],
  output: ArgType.String,
  async execute(ctx, [channelId]) {
    try {
      channelId ??= getSelfbotEnv(ctx, "message")?.channelId ?? null
      if (!channelId) return this.customError("Couldnt find channel")
      const channel = await ViaSelfbot.getChannel(getSelfbotClient(ctx), channelId)

      if (channel && channel.isText()) {
        channel.sendTyping()
        return this.success()
      }
      throw new Error("Invalid Channel")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

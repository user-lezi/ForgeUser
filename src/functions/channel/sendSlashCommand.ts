import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { TextChannel } from "discord.js-selfbot-v13"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$sendSlashCommand",
  description: "Sends slash command using selfbot.",
  aliases: ["$useSlashCommand"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("channel ID", "The channel to send slasg command to"),
    Arg.requiredUser("bot ID", "The bot ID"),
    Arg.requiredString("command name", "The name of slash command"),
    // TODO : Command options
  ],
  output: ArgType.String,
  async execute(ctx, [channelId, bot, name]) {
    try {
      const channel = await ViaSelfbot.getChannel(getSelfbotClient(ctx), channelId)
      if (channel && channel.isText()) {
        let response = await channel.sendSlash(bot.id, name)
        if (response.isMessage) {
          return this.success(response.id)
        }
        return this.customError("Modal not Supported yet")
      }
      throw new Error("Invalid Channel")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

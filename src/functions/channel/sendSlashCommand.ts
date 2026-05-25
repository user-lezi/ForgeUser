import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { TextChannel, User } from "discord.js-selfbot-v13"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"
import { SlashOptionsManager } from "../../structures/slashOptionsManager"

export const SlashOptionsManagerKey = "$SO_manager"

export default new NativeFunction({
  name: "$sendSlashCommand",
  description: "Sends slash command using selfbot.",
  aliases: ["$useSlashCommand", "$useSlash"],
  version: "1.0.0",
  unwrap: false,
  brackets: true,
  args: [
    Arg.requiredString("channel ID", "The channel to send slasg command to"),
    Arg.requiredUser("bot ID", "The bot ID"),
    Arg.requiredString("command name", "The name of slash command"),
    Arg.restString("slash options", "Set the slash options"),
  ],
  output: ArgType.String,
  async execute(ctx) {
    try {
      if (!this.data.fields) this.data.fields = []
      const options = await this["resolveMultipleArgs"](ctx, 0, 1, 2)
      let [channelId, bot, name] = options.args as [string, User, string]
      const r = options.return
      if (!r?.success) return r

      ctx.setEnvironmentKey(SlashOptionsManagerKey, new SlashOptionsManager())
      for (let i = 3; i < this.data.fields.length; i++) {
        const r = await this["resolveCode"](ctx, this.data.fields[i])
        if (!r?.success) return r
      }

      const channel = await ViaSelfbot.getChannel(getSelfbotClient(ctx), channelId)
      if (channel && channel.isText()) {
        const manager = ctx.getEnvironmentInstance(SlashOptionsManager, SlashOptionsManagerKey)!
        const options = manager.getByOrder().map((x) => x.value)
        const response = await channel.sendSlash(bot.id, name, ...options)
        ctx.deleteEnvironmentKey(SlashOptionsManagerKey)
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

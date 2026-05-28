import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient, getSelfbotEnv, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotReact",
  description: "Adds reactions to a message, returns amount of emojis successfully reacted",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("channelId", "The channel where the message is located."),
    Arg.requiredString("messageId", "The message ID"),
    Arg.restString("emojis; burst", "The emojis to react with; Super Reactions"),
  ],
  output: ArgType.Number,
  async execute(ctx, [channelId, messageId, emojis]) {
    try {
      let _burst = emojis.pop()
      let burst = false
      if (_burst) {
        if (_burst?.toLowerCase() == "true" || _burst?.toLowerCase() == "false") burst = _burst == "true"
        else emojis.push(_burst)
      }

      let client = getSelfbotClient(ctx)

      let message = (await ViaSelfbot.getMessage(client, channelId, messageId)) ?? getSelfbotEnv(ctx, "message")

      if (!message) return this.customError("No message found")

      let count = 0

      for (const emoji of emojis) {
        const success = await message.react(emoji, burst).catch(ctx.noop)
        if (success) count++
      }

      return this.success(count)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

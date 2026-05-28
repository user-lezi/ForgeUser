import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { TextChannel } from "discord.js-selfbot-v13"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$editSelfbotMessage",
  description: "Edits message using selfbot.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("channel ID", "The channel to edit this message"),

    Arg.requiredString("messageId", "The message to edit"),
    Arg.optionalString("content", "The content for the message"),
  ],
  output: ArgType.Boolean,
  async execute(ctx, [channelId, messageId, content]) {
    ctx.container.content = content ?? undefined
    const options = ctx.container.getOptions<any>()

    if (!ctx.container.isValidMessage(options)) {
      return this.customError("Invalid Message.")
    }

    // Things a selfbot/user account cannot send
    if ("embeds" in options && options.embeds?.length > 0) {
      return this.customError("Selfbots cannot send embeds.")
    }
    if ("components" in options && options.components?.length > 0) {
      return this.customError("Selfbots cannot send components (buttons, select menus, etc.).")
    }

    try {
      const message = await ViaSelfbot.getMessage(getSelfbotClient(ctx), channelId, messageId)

      if (message) {
        const msg = await message.edit(options)
        ctx.container.reset()
        return this.success(!!msg)
      }
      throw new Error("Couldnt find the message")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

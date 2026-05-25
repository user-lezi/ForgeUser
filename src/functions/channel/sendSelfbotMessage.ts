import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { TextChannel } from "discord.js-selfbot-v13"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$sendSelfbotMessage",
  description: "Sends message using selfbot.",
  aliases: ["$createSelfbotMessage"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("channel ID", "The channel to send this message to"),
    Arg.optionalString("content", "The content for the message"),
    Arg.optionalBoolean("return message ID", "Whether to return the message id of the newly sent message"),
  ],
  output: ArgType.String,
  async execute(ctx, [channelId, content, returnMessageID]) {
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
      const channel = await ViaSelfbot.getChannel(getSelfbotClient(ctx), channelId)

      if (channel && channel.isText()) {
        const msg = await (channel as TextChannel).send(options)
        ctx.container.reset()
        return this.success(returnMessageID ? msg?.id : undefined)
      }
      throw new Error("Invalid Channel")
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

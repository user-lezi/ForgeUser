import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { DMChannel, TextChannel } from "discord.js-selfbot-v13"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$sendSelfbotDM",
  description: "Sends DM message using selfbot.",
  aliases: ["$createSelfbotDM", "$selfbotDM"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredUser("user ID", "User to send this message to"),
    Arg.optionalString("content", "The content for the message"),
    Arg.optionalBoolean("return message ID", "Whether to return the message id of the newly sent message"),
  ],
  output: ArgType.String,
  async execute(ctx, [user, content, returnMessageID]) {
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
      const channel = await ViaSelfbot.getDMChannel(getSelfbotClient(ctx), user.id)

      if (channel) {
        const msg = await channel.send(options)
        ctx.container.reset()
        return this.success(returnMessageID ? msg?.id : undefined)
      }
      throw new Error(`Couldnt get DM Channel with ${user}`)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

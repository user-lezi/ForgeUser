import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient, ViaSelfbot } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotDMChannel",
  description: "Gets DM channel with a user using selfbot.",
  aliases: ["$createSelfbotDMChannel"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredUser("user ID", "User to send this message to")],
  output: ArgType.String,
  async execute(ctx, [user]) {
    try {
      const channel = await ViaSelfbot.getDMChannel(getSelfbotClient(ctx), user.id)

      if (channel) {
        return this.success(channel.id)
      }
      throw new Error(`Couldnt get DM Channel with ${user}`)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

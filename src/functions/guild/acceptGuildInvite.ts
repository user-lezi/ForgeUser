import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$acceptGuildInvite",
  description: "Joins a guild using guild's invite code",
  aliases: ["$joinGuild", "$joinServer"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("invite", "Guild's invite code"),
    Arg.optionalBoolean("bypassOnboarding", "Whether to bypass onboarding"),
    Arg.optionalBoolean("bypassVerify", "Whether to bypass rule screening"),
  ],
  output: [ArgType.Channel, ArgType.Guild],
  async execute(ctx, [invite, bypassOnboarding, bypassVerify]) {
    try {
      let client = getSelfbotClient(ctx)
      if (!client.options.captchaSolver) return this.customError("No captcha solver is passed.")
      return this.success(
        (
          await client.acceptInvite(invite, {
            bypassOnboarding: bypassOnboarding ?? true,
            bypassVerify: bypassVerify ?? true,
          })
        ).id
      )
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

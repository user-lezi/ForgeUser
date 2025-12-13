import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$getSelfbotUser",
  aliases: ["$me", "$selfbotUser"],
  description: "Returns the selfbot user information.",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalBoolean("force", "Forcefully fetch the information.")],
  version: "1.0.0",
  output: ArgType.Unknown,
  async execute(ctx, [force]) {
    try {
      const data = await ctx.client
        .getExtension(ForgeUser, true)
        .bot.me(force ?? false);

      return this.successJSON(data);
    } catch (err: any) {
      const msg = err?.message ?? err?.error ?? "Failed to send message.";

      return this.customError(msg);
    }
  },
});

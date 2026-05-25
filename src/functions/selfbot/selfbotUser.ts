import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotUser",
  description: "Returns the selfbot user.",
  aliases: ["$me"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("variable", "Load the user object into a variable")],
  output: ArgType.Json,
  execute(ctx, [variable]) {
    let user = getSelfbotClient(ctx).user
    if (!variable) return this.successJSON(user)
    ctx.setEnvironmentKey(variable, user)
    return this.success()
  },
})

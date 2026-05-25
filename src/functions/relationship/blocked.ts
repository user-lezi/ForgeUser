import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$blocked",
  description: "Returns the list of blocked users.",
  aliases: ["$blockedUsers", "$getBlockedUsers"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("separator", "Separator to join the list")],
  output: ArgType.String,
  execute(ctx, [sep]) {
    let client = getSelfbotClient(ctx)
    return this.success(client.relationships.blockedCache.map((x) => x.id).join(sep ?? ", "))
  },
})

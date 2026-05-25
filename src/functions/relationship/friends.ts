import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$friends",
  description: "Returns the list of friends.",
  aliases: ["$getFriends", "$getFriendList"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("separator", "Separator to join the list")],
  output: ArgType.String,
  execute(ctx, [sep]) {
    let client = getSelfbotClient(ctx)
    return this.success(client.relationships.friendCache.map((x) => x.id).join(sep ?? ", "))
  },
})

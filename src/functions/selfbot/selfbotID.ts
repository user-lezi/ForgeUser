import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotID",
  description: "Returns the selfbot user ID.",
  version: "1.0.0",
  unwrap: true,
  output: ArgType.User,
  execute(ctx) {
    let user = getSelfbotClient(ctx).user
    return this.success(user.id)
  },
})

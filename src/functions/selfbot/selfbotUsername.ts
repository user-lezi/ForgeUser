import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotUsername",
  description: "Returns the selfbot username.",
  version: "1.0.0",
  unwrap: true,
  output: ArgType.String,
  execute(ctx) {
    let user = getSelfbotClient(ctx).user
    return this.success(user.username)
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotPhone",
  description: "Returns the selfbot phone number.",
  version: "1.0.0",
  unwrap: true,
  output: ArgType.String,
  execute(ctx) {
    let user = getSelfbotClient(ctx).user
    return this.success(user.phone)
  },
})

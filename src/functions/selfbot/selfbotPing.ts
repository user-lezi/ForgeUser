import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotPing",
  description: "Returns the selfbot ws ping.",
  version: "1.0.0",
  unwrap: true,
  output: ArgType.Number,
  execute(ctx) {
    let client = getSelfbotClient(ctx)
    return this.success(client.ws.ping)
  },
})

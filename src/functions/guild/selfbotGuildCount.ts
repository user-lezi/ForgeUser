import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$selfbotGuildCount",
  description: "Returns the selfbot's guilds count.",
  aliases: ["$selfbotGuildsCount"],
  version: "1.0.0",
  unwrap: true,
  output: ArgType.String,
  execute(ctx) {
    let client = getSelfbotClient(ctx)
    return this.success(client.guilds.cache.size)
  },
})

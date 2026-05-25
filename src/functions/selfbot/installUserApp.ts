import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotClient } from "../../helpers"

export default new NativeFunction({
  name: "$installUserApp",
  description: "Installs User Application.",
  aliases: ["$installUserBot"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredUser("app ID", "Application ID")],
  output: ArgType.String,
  async execute(ctx, [app]) {
    let client = getSelfbotClient(ctx)
    if (!app.bot) return this.customError("Not an application")
    await client.installUserApps(app.id)
    return this.success(app.id)
  },
})

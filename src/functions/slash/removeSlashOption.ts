import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { SlashOptionsManager } from "../../structures/slashOptionsManager"
import { SlashOptionsManagerKey } from "../channel/sendSlashCommand"

export default new NativeFunction({
  name: "$removeSlashOption",
  description: "Removes a slash command option.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The option name")],
  output: ArgType.Boolean,
  execute(ctx, [name]) {
    let manager = ctx.getEnvironmentInstance(SlashOptionsManager, SlashOptionsManagerKey)
    if (!manager) return this.customError("Run this in $sendSlashCommand[] function.")
    manager.remove(name)
    return this.success(true)
  },
})

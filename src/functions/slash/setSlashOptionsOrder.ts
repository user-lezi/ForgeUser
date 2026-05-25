import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { SlashOptionsManager } from "../../structures/slashOptionsManager"
import { SlashOptionsManagerKey } from "../channel/sendSlashCommand"

export default new NativeFunction({
  name: "$setSlashOptionsOrder",
  description: "Sets the slash command options order.",
  aliases: ["$setSlashOrder", "$slashOptionsOrder"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.restString("option names", "The option names")],
  output: ArgType.Boolean,
  execute(ctx, [names]) {
    let manager = ctx.getEnvironmentInstance(SlashOptionsManager, SlashOptionsManagerKey)
    if (!manager) return this.customError("Run this in $sendSlashCommand[] function.")
    manager.setOrder(...names)
    return this.success(true)
  },
})

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { SlashOptionsManager } from "../../structures/slashOptionsManager"
import { SlashOptionsManagerKey } from "../channel/sendSlashCommand"

export default new NativeFunction({
  name: "$addStringSlashOption",
  description: "Add a string slash command options.",
  aliases: ["$stringSlashOption", "$setStringSlashOption"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The option name"), Arg.optionalString("value", "the option value")],
  output: ArgType.Boolean,
  execute(ctx, [name, value]) {
    let manager = ctx.getEnvironmentInstance(SlashOptionsManager, SlashOptionsManagerKey)
    if (!manager) return this.customError("Run this in $sendSlashCommand[] function.")
    manager.add(name, value ?? undefined)
    return this.success(true)
  },
})

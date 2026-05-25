import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { SlashOptionsManager } from "../../structures/slashOptionsManager"
import { SlashOptionsManagerKey } from "../channel/sendSlashCommand"
import { MessageAttachment } from "discord.js-selfbot-v13"

export default new NativeFunction({
  name: "$addAttachmentSlashOption",
  description: "Add an attachment slash command options.",
  aliases: ["$attachmentSlashOption", "$setAttachmentSlashOption"],
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The option name"), Arg.optionalString("path", "the option value")],
  output: ArgType.Boolean,
  execute(ctx, [name, path]) {
    let manager = ctx.getEnvironmentInstance(SlashOptionsManager, SlashOptionsManagerKey)
    if (!manager) return this.customError("Run this in $sendSlashCommand[] function.")
    let value: MessageAttachment | undefined = undefined
    if (path) {
      value = new MessageAttachment(path)
    }
    manager.add(name, value)
    return this.success(true)
  },
})

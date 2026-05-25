import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotEnv } from "../../helpers"
import { MessageAuthorProperties, MessageAuthorProperty } from "../../properties/messageAuthor"

export default new NativeFunction({
  name: "$selfbotMessageAuthor",
  description: "Returns the message's author provided to selfbot user.",
  aliases: ["$getSelfbotMessageAuthor"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [
    Arg.optionalEnum(MessageAuthorProperty, "property", "The property to pull."),
    Arg.optionalString("separator", "Separator to use for array values."),
  ],
  output: ArgType.String,
  execute(ctx, [prop, sep]) {
    let message = getSelfbotEnv(ctx, "message")

    // No message → return nothing
    if (!message) return this.success()

    // No property → return author id
    if (!prop) return this.successJSON(message.author.id)

    // Property exists → return specific part
    return this.success(MessageAuthorProperties[prop](message.author, sep))
  },
})

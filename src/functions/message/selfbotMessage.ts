import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { getSelfbotEnv } from "../../helpers"
import { MessageProperties, MessageProperty } from "../../properties/message"

export default new NativeFunction({
  name: "$selfbotMessage",
  description: "Returns the message provided to selfbot user.",
  aliases: ["$getSelfbotMessage"],
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [
    Arg.optionalEnum(MessageProperty, "property", "The property to pull."),
    Arg.optionalString("separator", "Separator to use for array values."),
  ],
  output: ArgType.String,
  execute(ctx, [prop, sep]) {
    let message = getSelfbotEnv(ctx, "message")

    // No message → return nothing
    if (!message) return this.success()

    // No property → return whole message content
    if (!prop) return this.successJSON(ctx.args.join(" "))

    // Property exists → return specific part
    return this.success(MessageProperties[prop](message, sep))
  },
})

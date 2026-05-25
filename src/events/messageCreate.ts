import { Interpreter } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { destructure, SelfbotEnvKeys } from "../helpers"

export default new ForgeUserEventHandler({
  name: "messageCreate",
  version: "1.0.0",
  description: "This event is triggered when the user client receives a message.",
  async listener(message) {
    const ext = this.getExtension(ForgeUser, true)
    const prefix = await ext.getPrefix(message)

    const args = message.content
      .slice(prefix?.length ?? 0)
      .trim()
      .split(/ +/g)
    const name = prefix ? args.shift()?.toLowerCase() : args[0]

    const commands = ext.commands.get("messageCreate").filter(
      // Allow always execute commands
      (cmd) =>
        !cmd.name || // Check if it matches the command name or one of aliases
        ((cmd.name === name || !!cmd.data.aliases?.includes(name!)) &&
          // If unprefixed there can be no prefix
          (cmd.data.unprefixed ? true : !!prefix))
    )

    for (const command of commands) {
      Interpreter.run({
        obj: destructure("message", message),
        command,
        client: this,
        data: command.compiled.code,
        args,
        environment: {
          [SelfbotEnvKeys.message]: message,
        },
      })
    }
  },
})

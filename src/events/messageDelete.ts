import { Interpreter } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { destructure, SelfbotEnvKeys } from "../helpers"
import { Message } from "discord.js"

export default new ForgeUserEventHandler({
  name: "messageDelete",
  version: "1.0.0",
  description: "This event is triggered whenever a message is deleted.",
  async listener(message) {
    const ext = this.getExtension(ForgeUser, true)
    const commands = ext.commands.get("messageDelete")

    for (const command of commands) {
      Interpreter.run({
        obj: destructure("message", message),
        command,
        client: this,
        states: {
          message: {
            new: message as unknown as Message,
            old: message as unknown as Message,
          },
        },
        data: command.compiled.code,
        args: message.content.split(/ +/g),
        environment: {
          [SelfbotEnvKeys.message]: message,
        },
      })
    }
  },
})

import { Interpreter } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { destructure, SelfbotEnvKeys } from "../helpers"
import { Collection } from "discord.js-selfbot-v13"

export default new ForgeUserEventHandler({
  name: "messageDeleteBulk",
  version: "1.0.0",
  description: "This event is triggered whenever messages is deleted in bulk.",
  async listener(messages) {
    const ext = this.getExtension(ForgeUser, true)
    const commands = ext.commands.get("messageDeleteBulk")
    const asArray = messages instanceof Collection ? Array.from(messages.values()) : [messages]
    const channel = messages.first()?.channel

    for (const command of commands) {
      Interpreter.run({
        obj: { channel },
        command,
        client: this,
        states: {
          bulk: {
            new: asArray as any,
          },
        },
        data: command.compiled.code,
        args: [],
      })
    }
  },
})

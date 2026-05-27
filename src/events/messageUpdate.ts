import { Interpreter } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { destructure, SelfbotEnvKeys } from "../helpers"
import messageCreate from "./messageCreate"
import { Message } from "discord.js-selfbot-v13"

export default new ForgeUserEventHandler({
  name: "messageUpdate",
  version: "1.0.0",
  description: "This event is triggered whenever a message is updated.",
  async listener(older, newer) {
    const ext = this.getExtension(ForgeUser, true)
    if (newer instanceof Message && ext.options.respondOnEdit) {
      if (
        typeof ext.options.respondOnEdit !== "number" ||
        Date.now() - newer.createdTimestamp <= ext.options.respondOnEdit
      ) {
        await messageCreate.listener.call(this, newer)
      }
    }

    const commands = this.commands.get("messageUpdate")

    for (const command of commands) {
      Interpreter.run({
        obj: destructure("message", newer),
        command,
        client: this,
        states: {
          message: {
            old: older as any,
            new: newer as any,
          },
        },
        data: command.compiled.code,
        args: newer.content?.split(/ +/),
        environment: {
          [SelfbotEnvKeys.message]: newer,
        },
      })
    }
  },
})

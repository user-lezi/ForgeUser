import { Interpreter, Logger } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { SelfbotEnvKeys } from "../helpers"

export default new ForgeUserEventHandler({
  name: "ready",
  version: "1.0.0",
  description: "This event is triggered when the user client is ready.",
  listener(userClient) {
    const commands = this.getExtension(ForgeUser, true).commands.get("ready")

    if (commands.length) {
      for (const command of commands) {
        Interpreter.run({
          client: this,
          command,
          data: command.compiled.code,
          obj: {},
        })
      }
    } else {
      let { email, phone, username, displayName } = userClient.user
      Logger.info(
        [
          `Ready on user client ${displayName} [@${username}]`,
          email ? `[${censoreEmail(email)}]` : undefined,
          phone ? `[${censorePhone(phone)}]` : undefined,
        ]
          .filter(Boolean)
          .join(" ")
      )
    }
  },
})

function censoreEmail(email: string, visiblity = 0.4, char = "*") {
  let [a, b] = email.split("@")
  let c = Math.floor(a.length * visiblity)
  return `${a.slice(0, c)}${char.repeat(Math.max(5, a.length - c))}@${b}`
}
function censorePhone(phone: string, digits = 3, char = "*") {
  return `${char.repeat(phone.length - digits)}${phone.slice(-digits)}`
}

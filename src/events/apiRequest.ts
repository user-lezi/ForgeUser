import { Interpreter, Logger } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { SelfbotEnvKeys } from "../helpers"

export default new ForgeUserEventHandler({
  name: "apiRequest",
  version: "1.0.0",
  description: "This event is triggered before the user client sends an api request.",
  listener(req) {
    const commands = this.getExtension(ForgeUser, true).commands.get("apiRequest")

    for (const command of commands) {
      Interpreter.run({
        client: this,
        command,
        data: command.compiled.code,
        obj: {},
        environment: {
          [SelfbotEnvKeys.apiRequest]: req,
        },
      })
    }
  },
})

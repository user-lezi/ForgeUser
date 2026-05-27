import { Interpreter, Logger } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."
import { SelfbotEnvKeys } from "../helpers"

export default new ForgeUserEventHandler({
  name: "apiResponse",
  version: "1.0.0",
  description: "This event is triggered after the user client sent api request has received a response.",
  listener(req, res) {
    const commands = this.getExtension(ForgeUser, true).commands.get("apiResponse")

    for (const command of commands) {
      Interpreter.run({
        client: this,
        command,
        data: command.compiled.code,
        obj: {},
        environment: {
          [SelfbotEnvKeys.apiResponse]: { request: req, response: req },
        },
      })
    }
  },
})

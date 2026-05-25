import { Interpreter, Logger } from "@tryforge/forgescript"
import { ForgeUserEventHandler } from "../structures/eventManager"
import { ForgeUser } from ".."

export default new ForgeUserEventHandler({
  name: "debug",
  version: "1.0.0",
  description: "This event is triggered when the user client sends debug information.",
  listener(debug) {
    const commands = this.getExtension(ForgeUser, true).commands.get("debug")

    for (const command of commands) {
      Interpreter.run({
        client: this,
        command,
        data: command.compiled.code,
        obj: {},
        extras: debug,
      })
    }
  },
})

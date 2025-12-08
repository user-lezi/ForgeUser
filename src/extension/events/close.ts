import { Interpreter } from "@tryforge/forgescript";
import { ForgeUserEventHandler } from "../structures/eventManager";
import { ForgeUser } from "..";

export default new ForgeUserEventHandler({
  name: "close",
  version: "1.0.0",
  description: "Triggered when the SelfBot WebSocket connection closes.",
  listener(code, reason) {
    const commands = this.getExtension(ForgeUser, true).commands.get("close");

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: { code, reason },
      });
    }
  },
});

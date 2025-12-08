import { Interpreter } from "@tryforge/forgescript";
import { ForgeUserEventHandler } from "../structures/eventManager";
import { ForgeUser } from "..";

export default new ForgeUserEventHandler({
  name: "raw",
  version: "1.0.0",
  description: "Triggered when the SelfBot receives any packet.",
  listener(packet) {
    const commands = this.getExtension(ForgeUser, true).commands.get("raw");
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: packet,
      });
    }
  },
});

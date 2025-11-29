import { Interpreter } from "@tryforge/forgescript";
import { ForgeUserEventHandler } from "../structures/eventManager";
import { ForgeUser } from "..";
export default new ForgeUserEventHandler({
  name: "open",
  version: "1.0.0",
  description:
    "This event is triggered when the SelfBot's WebSocket connection opens.",
  listener() {
    const commands = this.getExtension(ForgeUser, true).commands.get("open");

    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
      });
    }
  },
});

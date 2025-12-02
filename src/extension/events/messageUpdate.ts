import { Interpreter } from "@tryforge/forgescript";
import { Message } from "discord.js";
import { ForgeUserEventHandler } from "../structures/eventManager";
import { ForgeUser } from "..";
export default new ForgeUserEventHandler({
  name: "messageUpdate",
  version: "1.0.0",
  description:
    "This event is triggered when the SelfBot receives MESSAGE_UPDATE packet.",
  listener(apimessage) {
    const commands = this.getExtension(ForgeUser, true).commands.get(
      "messageUpdate",
    );
    for (const command of commands) {
      Interpreter.run({
        obj: {},
        client: this,
        command,
        data: command.compiled.code,
        extras: apimessage,
      });
    }
  },
});

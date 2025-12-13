import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$selfbotPing",
  aliases: ["$userPing"],
  description: "Returns the current SelfBot WebSocket ping (ms).",
  unwrap: true,
  version: "1.0.0",
  output: ArgType.Number,

  async execute(ctx) {
    return this.success(ctx.client.getExtension(ForgeUser, true).bot.ping);
  },
});

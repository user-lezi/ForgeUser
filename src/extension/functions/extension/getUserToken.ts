import { ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$getUserToken",
  description:
    "Returns the provided user token from the selfbot configuration.",
  unwrap: true,
  version: "1.0.0",
  output: ArgType.String,
  async execute(ctx) {
    return this.success(ctx.client.getExtension(ForgeUser, true).bot.token);
  },
});

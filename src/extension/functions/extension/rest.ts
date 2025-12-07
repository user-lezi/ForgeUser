import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$rest",
  description: "Send API Request to Discord API.",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("route", "Route to request."),
    Arg.requiredString("method", "Route method, like so `get`"),
    Arg.optionalJson("body", "Body has to be json"),
  ],

  version: "1.0.0",
  output: ArgType.Unknown,

  async execute(ctx, [route, method, body]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    try {
      return this.successFormatted(
        await rest[method.toLowerCase() as "post"](route, body ?? undefined),
      );
    } catch (err) {
      return this.customError(`REST Error: ${err}`);
    }
  },
});

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$getUserProfile",
  description:
    "Fetches a Discord user's profile (banner, bio, accent color, etc.)",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("id", "The user's id."),
    Arg.optionalBoolean("force", "Forcefully fetch the information."),
  ],

  version: "1.0.0",
  output: ArgType.String,

  async execute(ctx, [id, force]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    try {
      const data = await rest.get(`/users/${id}/profile`, {
        force: force == null ? false : force,
      });

      return this.successJSON(data);
    } catch (err) {
      return this.customError(`REST Error: ${err}`);
    }
  },
});

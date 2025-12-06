import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";
import {
  UserProfileProperties,
  UserProfileProperty,
} from "../../properties/userProfile";

export default new NativeFunction({
  name: "$getUserProfile",
  description:
    "Fetches a Discord user's profile (banner, bio, accent color, etc.)",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("id", "The user's id."),
    Arg.optionalBoolean("force", "Forcefully fetch the information."),
    Arg.optionalEnum(UserProfileProperty, "property", "The property to pull."),
    Arg.optionalString("separator", "Separator to use in case of array"),
  ],

  version: "1.0.0",
  output: ArgType.String,

  async execute(ctx, [id, force, prop, sep]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    try {
      const data = await rest.get(`/users/${id}/profile`, {
        force: force == null ? false : force,
      });

      if (!prop) return this.successJSON(data);
      return this.success(UserProfileProperties[prop](data, sep ?? ", "));
    } catch (err) {
      return this.customError(`REST Error: ${err}`);
    }
  },
});

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import {
  UserBadgeProperties,
  UserBadgeProperty,
} from "../../properties/userBadge";
import { ForgeUser } from "../..";

export default new NativeFunction({
  name: "$getUserBadges",
  description: "Fetches a user's badges.",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("id", "The user's id."),
    Arg.optionalEnum(UserBadgeProperty, "property", "The property to pull."),
    Arg.optionalString("separator", "Separator to use in case of array."),
  ],
  version: "1.0.0",
  output: ArgType.Unknown,

  async execute(ctx, [userId, property, sep]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    try {
      const data = await rest.get(`/users/${userId}/profile`);

      if (!property) return this.successJSON(data.badges);
      return this.success(UserBadgeProperties[property](data, sep ?? ", "));
    } catch (err: any) {
      const msg = err?.message ?? err?.error ?? "Failed to send message.";

      return this.customError(msg);
    }
  },
});

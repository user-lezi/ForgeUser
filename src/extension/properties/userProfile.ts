import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";
import { CDNRoutes } from "discord.js";
import { IUserProfile } from "../../core/types";

export enum UserProfileProperty {
  id = "id",
  username = "username",
  globalName = "globalName",
  badges = "badges",
  avatar = "avatar",
  accentColor = "accentColor",
  banner = "banner",
}

export const UserProfileProperties = defineProperties<
  typeof UserProfileProperty,
  IUserProfile
>({
  id: (i) => i?.user.id,
  avatar: (i) =>
    i?.user.avatar
      ? CDNRoutes.userAvatar(
          i.user.id,
          i.user.avatar,

          // @ts-ignore - im lzy
          i.user.avatar.startsWith("a_") ? "gif" : "png",
        )
      : // @ts-ignore - im lzy
        CDNRoutes.defaultUserAvatar((i!.user.id >> 22) % 6),
  badges: (i, sep) => i?.badges.map((x) => x.id).join(sep || ", "),
  globalName: (i) => i?.user.global_name,
  username: (i) => i?.user.username,
  banner: (i) =>
    i?.user.banner
      ? CDNRoutes.userBanner(
          i.user.id,
          i.user.banner,

          // @ts-ignore - im lzy
          i.user.banner.startsWith("a_") ? "gif" : "png",
        )
      : "",
  accentColor: (i) => i?.user.accent_color,
});

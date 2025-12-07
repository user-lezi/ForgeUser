import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";
import { CDNRoutes, UserPremiumType } from "discord.js";
import { IUserProfile } from "../../core/types";

function cdn<S extends string>(s: S) {
  return `https://cdn.discordapp.com${s}`;
}

export enum UserProfileProperty {
  id = "id",
  username = "username",
  globalName = "globalName",
  badges = "badges",
  avatar = "avatar",
  accentColor = "accentColor",
  banner = "banner",
  bannerColor = "bannerColor",
  bio = "bio",
  clanTag = "clanTag",
  clanID = "clanID",
  clanBadge = "clanBadge",
  premiumType = "premiumType",
  premiumSince = "premiumSince",
  premiumGuildSince = "premiumGuildSince",
}

export const UserProfileProperties = defineProperties<
  typeof UserProfileProperty,
  IUserProfile
>({
  id: (i) => i?.user.id,
  avatar: (i) =>
    cdn(
      i?.user.avatar
        ? CDNRoutes.userAvatar(
            i.user.id,
            i.user.avatar,

            // @ts-ignore - im lzy
            i.user.avatar.startsWith("a_") ? "gif" : "png",
          )
        : // @ts-ignore - im lzy
          CDNRoutes.defaultUserAvatar((i!.user.id >> 22) % 6),
    ),
  badges: (i, sep) => i?.badges.map((x) => x.id).join(sep || ", "),
  globalName: (i) => i?.user.global_name,
  username: (i) => i?.user.username,
  banner: (i) =>
    i?.user.banner
      ? cdn(
          CDNRoutes.userBanner(
            i.user.id,
            i.user.banner,

            // @ts-ignore - im lzy
            i.user.banner.startsWith("a_") ? "gif" : "png",
          ),
        )
      : "",
  accentColor: (i) => i?.user.accent_color,
  bannerColor: (i) => i?.user.banner_color,
  bio: (i) => i?.user.bio,
  clanID: (i) => i?.user.clan?.identity_guild_id,
  clanBadge: (i) =>
    i?.user.clan?.badge
      ? cdn(
          CDNRoutes.guildTagBadge(
            i.user.clan.identity_guild_id!,
            i.user.clan.badge,
            // @ts-ignore - im lzy
            i.user.clan.badge.startsWith("a_") ? "gif" : "png",
          ),
        )
      : "",
  clanTag: (i) => i?.user.clan?.tag,
  premiumType: (i) => UserPremiumType[i?.premium_type!],
  premiumSince: (i) => (i?.premium_since ? Date.parse(i.premium_since) : ""),
  premiumGuildSince: (i) =>
    i?.premium_guild_since ? Date.parse(i.premium_guild_since) : "",
});

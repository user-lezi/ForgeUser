import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";
import { CDN, CDNRoutes } from "discord.js";

export interface IUserProfile {
  user: {
    id: string;
    username: string;
    global_name: string;
    avatar: string;
    avatar_decoration_data: {
      asset: string;
      sku_id: string;
      expires_at: any;
    };
    collectibles: {
      nameplate: {
        asset: string;
        palette: string;
        label: string;
        sku_id: string;
        expires_at: any;
      };
    };
    discriminator: string;
    display_name_styles: {
      font_id: number;
      effect_id: number;
      colors: Array<number>;
    };
    public_flags: number;
    primary_guild: {
      identity_guild_id: string;
      identity_enabled: boolean;
      tag: string;
      badge: string;
    };
    clan: {
      identity_guild_id: string;
      identity_enabled: boolean;
      tag: string;
      badge: string;
    };
    flags: number;
    banner: string;
    banner_color: string;
    accent_color: number;
    bio: string;
  };
  connected_accounts: Array<any>;
  premium_type: number;
  premium_since: string;
  premium_guild_since: string;
  profile_themes_experiment_bucket: number;
  user_profile: {
    bio: string;
    accent_color: number;
    pronouns: string;
    profile_effect: any;
    banner: string;
    theme_colors: Array<number>;
    popout_animation_particle_type: any;
    emoji: any;
  };
  badges: Array<{
    id: string;
    description: string;
    icon: string;
    link?: string;
  }>;
  guild_badges: Array<any>;
  widgets: Array<any>;
  mutual_guilds: Array<{
    id: string;
    nick: any;
  }>;
  legacy_username: string;
}

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

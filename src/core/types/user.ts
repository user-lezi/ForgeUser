import {
  APIUser,
  APIUserPrimaryGuild,
  UserPremiumType,
} from "discord-api-types/v10";

export interface IUser extends Omit<
  APIUser,
  "avatar_decoration" | "avatar_decoration_data"
> {
  banner_color: string | null;
  display_name_styles: null;
  clan: APIUserPrimaryGuild | null;
  avatar_decoration_data: {
    asset: string;
    sku_id: string;
    expires_at: string | null;
  } | null;
  bio: string;
}
export interface IUserProfile {
  user: IUser;
  connected_accounts: Array<any>;
  premium_type: UserPremiumType;
  premium_since: string | null;
  premium_guild_since: string | null;
  profile_themes_experiment_bucket: number;
  user_profile: {
    bio: string;
    accent_color: number;
    pronouns: string;
    profile_effect: {
      id: string;
      sku_id: string;
      expires_at: string | null;
    } | null;
    banner: string;
    theme_colors: [number, number];
    popout_animation_particle_type: any;
    emoji: string | null;
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
    nick: string | null;
  }>;
  legacy_username?: string;
}

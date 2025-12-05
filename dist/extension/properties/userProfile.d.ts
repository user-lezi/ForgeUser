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
export declare enum UserProfileProperty {
    id = "id",
    username = "username",
    globalName = "globalName",
    badges = "badges",
    avatar = "avatar",
    accentColor = "accentColor",
    banner = "banner"
}
export declare const UserProfileProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof UserProfileProperty, IUserProfile>;

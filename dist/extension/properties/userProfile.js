"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileProperties = exports.UserProfileProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
const discord_js_1 = require("discord.js");
var UserProfileProperty;
(function (UserProfileProperty) {
    UserProfileProperty["id"] = "id";
    UserProfileProperty["username"] = "username";
    UserProfileProperty["globalName"] = "globalName";
    UserProfileProperty["badges"] = "badges";
    UserProfileProperty["avatar"] = "avatar";
    UserProfileProperty["accentColor"] = "accentColor";
    UserProfileProperty["banner"] = "banner";
    UserProfileProperty["bannerColor"] = "bannerColor";
    UserProfileProperty["bio"] = "bio";
    UserProfileProperty["clanTag"] = "clanTag";
    UserProfileProperty["clanID"] = "clanID";
    UserProfileProperty["clanBadge"] = "clanBadge";
    UserProfileProperty["premiumType"] = "premiumType";
    UserProfileProperty["premiumSince"] = "premiumSince";
    UserProfileProperty["premiumGuildSince"] = "premiumGuildSince";
})(UserProfileProperty || (exports.UserProfileProperty = UserProfileProperty = {}));
exports.UserProfileProperties = (0, defineProperties_1.default)({
    id: (i) => i?.user.id,
    avatar: (i) => i?.user.avatar
        ? discord_js_1.CDNRoutes.userAvatar(i.user.id, i.user.avatar, i.user.avatar.startsWith("a_") ? "gif" : "png")
        :
            discord_js_1.CDNRoutes.defaultUserAvatar((i.user.id >> 22) % 6),
    badges: (i, sep) => i?.badges.map((x) => x.id).join(sep || ", "),
    globalName: (i) => i?.user.global_name,
    username: (i) => i?.user.username,
    banner: (i) => i?.user.banner
        ? discord_js_1.CDNRoutes.userBanner(i.user.id, i.user.banner, i.user.banner.startsWith("a_") ? "gif" : "png")
        : "",
    accentColor: (i) => i?.user.accent_color,
    bannerColor: (i) => i?.user.banner_color,
    bio: (i) => i?.user.bio,
    clanID: (i) => i?.user.clan?.identity_guild_id,
    clanBadge: (i) => i?.user.clan?.badge
        ? discord_js_1.CDNRoutes.guildTagBadge(i.user.clan.identity_guild_id, i.user.clan.badge, i.user.clan.badge.startsWith("a_") ? "gif" : "png")
        : "",
    clanTag: (i) => i?.user.clan?.tag,
    premiumType: (i) => discord_js_1.UserPremiumType[i?.premium_type],
    premiumSince: (i) => (i?.premium_since ? Date.parse(i.premium_since) : ""),
    premiumGuildSince: (i) => i?.premium_guild_since ? Date.parse(i.premium_guild_since) : "",
});

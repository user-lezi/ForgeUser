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
});

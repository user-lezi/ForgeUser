"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBadgeProperties = exports.UserBadgeProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
const util_1 = require("../util");
var UserBadgeProperty;
(function (UserBadgeProperty) {
    UserBadgeProperty["id"] = "id";
    UserBadgeProperty["description"] = "description";
    UserBadgeProperty["icon"] = "icon";
    UserBadgeProperty["link"] = "link";
})(UserBadgeProperty || (exports.UserBadgeProperty = UserBadgeProperty = {}));
exports.UserBadgeProperties = (0, defineProperties_1.default)({
    description: (i, sep) => i?.badges
        .map((i) => i.description)
        .filter((i) => i)
        .join(sep ?? ", "),
    icon: (i, sep) => i?.badges
        .map((i) => i.icon)
        .filter((i) => i)
        .map((i) => (0, util_1.cdn)(`/badge-icons/${i}.${i.startsWith("a_") ? "gif" : "png"}`))
        .join(sep ?? ", "),
    id: (i, sep) => i?.badges
        .map((i) => i.id)
        .filter((i) => i)
        .join(sep ?? ", "),
    link: (i, sep) => i?.badges
        .map((i) => i.link)
        .filter((i) => i)
        .join(sep ?? ", "),
});

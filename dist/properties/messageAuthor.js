"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAuthorProperties = exports.MessageAuthorProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
var MessageAuthorProperty;
(function (MessageAuthorProperty) {
    MessageAuthorProperty["id"] = "id";
    MessageAuthorProperty["username"] = "username";
    MessageAuthorProperty["displayName"] = "displayName";
    MessageAuthorProperty["bot"] = "bot";
    MessageAuthorProperty["avatar"] = "avatar";
    MessageAuthorProperty["banner"] = "banner";
    MessageAuthorProperty["discriminator"] = "discriminator";
    MessageAuthorProperty["created"] = "created";
    MessageAuthorProperty["friendNickname"] = "friendNickname";
})(MessageAuthorProperty || (exports.MessageAuthorProperty = MessageAuthorProperty = {}));
exports.MessageAuthorProperties = (0, defineProperties_1.default)({
    id: (a) => a?.id,
    username: (a) => a?.username,
    displayName: (a) => a?.displayName,
    bot: (a) => a?.bot,
    avatar: (a) => a?.displayAvatarURL(),
    banner: (a) => a?.bannerURL(),
    discriminator: (a) => a?.discriminator,
    created: (a) => a?.createdTimestamp,
    friendNickname: (a) => a?.friendNickname,
});

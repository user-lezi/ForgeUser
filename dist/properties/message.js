"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProperties = exports.MessageProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
var MessageProperty;
(function (MessageProperty) {
    MessageProperty["id"] = "id";
    MessageProperty["guildID"] = "guildID";
    MessageProperty["content"] = "content";
    MessageProperty["flags"] = "flags";
    MessageProperty["username"] = "username";
    MessageProperty["type"] = "type";
    MessageProperty["channelID"] = "channelID";
    MessageProperty["authorID"] = "authorID";
    MessageProperty["timestamp"] = "timestamp";
    MessageProperty["editTimestamp"] = "editTimestamp";
    MessageProperty["attachments"] = "attachments";
    MessageProperty["stickers"] = "stickers";
    MessageProperty["mentions"] = "mentions";
})(MessageProperty || (exports.MessageProperty = MessageProperty = {}));
exports.MessageProperties = (0, defineProperties_1.default)({
    id: (m) => m?.id,
    guildID: (m) => m?.guildId,
    content: (m) => m?.content,
    flags: (m, sep) => m?.flags.toArray().join(sep ?? ", "),
    channelID: (m) => m?.channelId,
    type: (m) => m?.type,
    username: (m) => m?.author?.username,
    authorID: (m) => m?.author?.id,
    timestamp: (m) => m?.createdTimestamp,
    editTimestamp: (m) => m?.editedTimestamp,
    attachments: (m, sep) => m?.attachments.map((x) => x.url).join(sep ?? ", "),
    stickers: (m, sep) => m?.stickers?.map((x) => x.id).join(sep ?? ", "),
    mentions: (m, sep) => m?.mentions.users.map((x) => x.id).join(sep ?? ", "),
});

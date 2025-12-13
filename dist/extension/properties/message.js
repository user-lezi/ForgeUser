"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProperties = exports.MessageProperty = void 0;
const v10_1 = require("discord-api-types/v10");
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
var MessageProperty;
(function (MessageProperty) {
    MessageProperty["id"] = "id";
    MessageProperty["content"] = "content";
    MessageProperty["flags"] = "flags";
    MessageProperty["username"] = "username";
    MessageProperty["type"] = "type";
    MessageProperty["channelID"] = "channelID";
    MessageProperty["authorID"] = "authorID";
    MessageProperty["timestamp"] = "timestamp";
    MessageProperty["editTimestamp"] = "editTimestamp";
    MessageProperty["hasPoll"] = "hasPoll";
    MessageProperty["attachments"] = "attachments";
    MessageProperty["stickers"] = "stickers";
    MessageProperty["mentions"] = "mentions";
})(MessageProperty || (exports.MessageProperty = MessageProperty = {}));
exports.MessageProperties = (0, defineProperties_1.default)({
    content: (m) => m?.content,
    id: (m) => m?.id,
    flags: (m) => m?.flags,
    channelID: (m) => m?.channel_id,
    type: (m) => (m ? v10_1.MessageType[m.type] : undefined),
    username: (m) => m?.author?.username,
    authorID: (m) => m?.author?.id,
    timestamp: (m) => m?.timestamp,
    editTimestamp: (m) => m?.edited_timestamp,
    hasPoll: (m) => !!m?.poll,
    attachments: (m, sep) => m?.attachments.map((x) => x.url).join(sep ?? ", "),
    stickers: (m, sep) => m?.sticker_items?.map((x) => x.id).join(sep ?? ","),
    mentions: (m, sep) => m?.mentions.map((x) => x.id).join(sep ?? ","),
});

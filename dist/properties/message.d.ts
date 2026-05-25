import { Message } from "discord.js-selfbot-v13";
export declare enum MessageProperty {
    id = "id",
    guildID = "guildID",
    content = "content",
    flags = "flags",
    username = "username",
    type = "type",
    channelID = "channelID",
    authorID = "authorID",
    timestamp = "timestamp",
    editTimestamp = "editTimestamp",
    attachments = "attachments",
    stickers = "stickers",
    mentions = "mentions"
}
export declare const MessageProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof MessageProperty, Message<boolean>>;

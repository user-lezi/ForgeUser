import { APIMessage } from "discord-api-types/v10";
export declare enum MessageProperty {
    id = "id",
    content = "content",
    flags = "flags",
    username = "username",
    type = "type",
    channelID = "channelID",
    authorID = "authorID",
    timestamp = "timestamp",
    editTimestamp = "editTimestamp",
    hasPoll = "hasPoll",
    attachments = "attachments",
    stickers = "stickers",
    mentions = "mentions"
}
export declare const MessageProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof MessageProperty, APIMessage>;

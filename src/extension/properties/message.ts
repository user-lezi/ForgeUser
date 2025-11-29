import { APIMessage, MessageType } from "discord-api-types/v10";
import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";
export enum MessageProperty {
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
}

export const MessageProperties = defineProperties<
  typeof MessageProperty,
  APIMessage
>({
  content: (m) => m?.content,
  id: (m) => m?.id,
  flags: (m) => m?.flags,
  channelID: (m) => m?.channel_id,
  type: (m) => (m ? MessageType[m.type] : undefined),
  username: (m) => m?.author?.username,
  authorID: (m) => m?.author?.id,
  timestamp: (m) => m?.timestamp,
  editTimestamp: (m) => m?.edited_timestamp,
  hasPoll: (m) => !!m?.poll,
  attachments: (m, sep) => m?.attachments.map((x) => x.url).join(sep ?? ", "),
  stickers: (m, sep) => m?.sticker_items?.map((x) => x.id).join(sep ?? ","),
});

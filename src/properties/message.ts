import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties"
import { Message } from "discord.js-selfbot-v13"

export enum MessageProperty {
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
  mentions = "mentions",
}

export const MessageProperties = defineProperties<typeof MessageProperty, Message>({
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
})

import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties"
import { Message } from "discord.js-selfbot-v13"

export enum MessageAuthorProperty {
  id = "id",
  username = "username",
  displayName = "displayName",
  bot = "bot",
  avatar = "avatar",
  banner = "banner",
  discriminator = "discriminator",
  created = "created",
  friendNickname = "friendNickname",
}

export const MessageAuthorProperties = defineProperties<typeof MessageAuthorProperty, Message["author"]>({
  id: (a) => a?.id,
  username: (a) => a?.username,
  displayName: (a) => a?.displayName,
  bot: (a) => a?.bot,
  avatar: (a) => a?.displayAvatarURL(),
  banner: (a) => a?.bannerURL(),
  discriminator: (a) => a?.discriminator,
  created: (a) => a?.createdTimestamp,
  friendNickname: (a) => a?.friendNickname,
})

import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { ForgeUser } from ".."
import { APIRequest, Client, Collection, Message, Snowflake } from "discord.js-selfbot-v13"

export interface IForgeUserEvents {
  ready: [Client<true>]
  debug: [string]
  apiRequest: [APIRequest]
  apiResponse: [APIRequest, Response]

  messageCreate: [Message]
  messageDelete: [Message]
  messageDeleteBulk: [Collection<Snowflake, Message>]
  messageUpdate: [Message, Message]
}

export class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
  register(client: ForgeClient): void {
    client
      .getExtension(ForgeUser, true)
      // @ts-ignore - idk vro
      .userClient.on(this.name, this.listener.bind(client))
  }
}

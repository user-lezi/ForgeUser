import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript"
import { ForgeUser } from ".."
import { Client, Message } from "discord.js-selfbot-v13"

export interface IForgeUserEvents {
  ready: [Client<true>]
  debug: [string]

  messageCreate: [Message]
}

export class ForgeUserEventHandler<T extends keyof IForgeUserEvents> extends BaseEventHandler<IForgeUserEvents, T> {
  register(client: ForgeClient): void {
    client
      .getExtension(ForgeUser, true)
      // @ts-ignore - idk vro
      .userClient.on(this.name, this.listener.bind(client))
  }
}

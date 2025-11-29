import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeUser } from "..";
import { APIMessage } from "discord-api-types/v10";
export interface IForgeUserEvents {
  open: [];
  messageCreate: [APIMessage];
}

export class ForgeUserEventHandler<
  T extends keyof IForgeUserEvents,
> extends BaseEventHandler<IForgeUserEvents, T> {
  register(client: ForgeClient): void {
    client
      .getExtension(ForgeUser, true)
      // @ts-ignore - idk vro
      .bot.on(this.name, this.listener.bind(client));
  }
}

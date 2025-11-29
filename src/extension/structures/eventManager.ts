import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeUser } from "..";
export interface IForgeUserEvents {
  open: [];
}

export class ForgeUserEventHandler<
  T extends keyof IForgeUserEvents,
> extends BaseEventHandler<IForgeUserEvents, T> {
  register(client: ForgeClient): void {
    client
      .getExtension(ForgeUser, true)
      .bot.on(this.name, this.listener.bind(client));
  }
}

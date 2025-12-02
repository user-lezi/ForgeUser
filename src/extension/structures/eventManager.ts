import { BaseEventHandler, ForgeClient } from "@tryforge/forgescript";
import { ForgeUser } from "..";
import { APIMessage, GatewayDispatchPayload } from "discord-api-types/v10";
export interface IForgeUserEvents {
  raw: [GatewayDispatchPayload];
  open: [];
  close: [code: number, reason: Buffer];
  error: [err: Error];
  messageCreate: [APIMessage];
  messageUpdate: [APIMessage];
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

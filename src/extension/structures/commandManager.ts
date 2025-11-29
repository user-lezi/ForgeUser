import { BaseCommandManager } from "@tryforge/forgescript";
import { IForgeUserEvents } from "./eventManager";

export class ForgeUserCommandManager extends BaseCommandManager<
  keyof IForgeUserEvents
> {
  handlerName = "ForgeUserEvents";
}

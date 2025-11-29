import {
  EventManager,
  ForgeClient,
  ForgeExtension,
} from "@tryforge/forgescript";
import { SelfBot } from "../core";
import { ForgeUserCommandManager } from "./structures/commandManager";
import { IForgeUserEvents } from "./structures/eventManager";

/** ForgeUser Options */
export interface IForgeUserOptions {
  /** Discord user token */
  token: string;
  /** Events */
  events: (keyof IForgeUserEvents)[];
}

export class ForgeUser extends ForgeExtension {
  public name = "ForgeUser";
  public description: string = require("../../package.json").description;
  public version: string = require("../../package.json").version;

  private options: IForgeUserOptions;
  private selfbot!: SelfBot;

  public commands!: ForgeUserCommandManager;

  public constructor(options: Partial<IForgeUserOptions> = {}) {
    super();

    const defaults: IForgeUserOptions = {
      token: "",
      events: [],
    };

    this.options = { ...defaults, ...options };

    if (!this.options.token) {
      throw new Error(`ForgeUser: "token" is required.`);
    }
  }

  /**
   * Called by ForgeScript automatically when the extension initializes.
   */
  public init(client: ForgeClient): void {
    this.selfbot = new SelfBot(this.options.token);
    this.commands = new ForgeUserCommandManager(client);

    EventManager.load("ForgeUserEvents", __dirname + "/events");
    // this.load(__dirname + "/functions")

    if (this.options?.events?.length)
      client.events.load("ForgeUserEvents", this.options.events);
  }

  /** Returns the active SelfBot instance. */
  public get bot(): SelfBot {
    return this.selfbot;
  }
}

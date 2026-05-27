import {
  BaseCommand,
  Compiler,
  EventManager,
  ForgeClient,
  ForgeExtension,
  IExtendedCompilationResult,
  Interpreter,
} from "@tryforge/forgescript"
import { Client, ClientOptions, Message } from "discord.js-selfbot-v13"
import { IForgeUserEvents } from "./structures/eventManager"
import { ForgeUserCommandManager } from "./structures/commandManager"
import { destructure, SelfbotEnvKeys } from "./helpers"

/** ForgeUser Options */
export interface IRawForgeUserOptions {
  /** Client options for selfbot client */
  clientOptions: ClientOptions
  /** User Token */
  token: string
  /**
   * The prefixes our user client will act upon for command messages
   */
  prefixes?: string[]
  /**
   *  Whether prefixes should be case-insensitive, this only affects letters
   */
  prefixCaseInsensitive?: boolean
  /**
   * Allows the user client to execute events triggered by other bots (and itself)
   */
  allowBots?: boolean

  /**
   * Allows the user bot to re-use messages that were edited to find possibly command calls.
   * If a number is passed, it's treated as the amount of milliseconds that can pass before
   * the message becomes completely unusable.
   */
  respondOnEdit?: number | boolean

  /** The events to listen */
  events: (keyof IForgeUserEvents)[]
}

export interface IForgeUserOptions extends Omit<IRawForgeUserOptions, "prefixes"> {
  prefixes: IExtendedCompilationResult[]
}

export class ForgeUser extends ForgeExtension {
  public name = "ForgeUser"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  #__rawPrefixes: string[]
  public options: Required<IForgeUserOptions>
  public userClient: Client
  public commands!: ForgeUserCommandManager

  public constructor(options: Partial<IRawForgeUserOptions> = {}) {
    super()

    this.options = {
      clientOptions: options.clientOptions ?? {},
      events: options.events ?? [],
      prefixes: [],
      prefixCaseInsensitive: options.prefixCaseInsensitive ?? false,
      token: options.token ?? "",
      allowBots: options.allowBots ?? false,
      respondOnEdit: options.respondOnEdit ?? false,
    }
    this.userClient = new Client(this.options.clientOptions)
    this.#__rawPrefixes = options.prefixes ?? []
  }

  /**
   * Called by ForgeScript automatically when the extension initializes.
   */
  public init(client: ForgeClient): void {
    this.commands = new ForgeUserCommandManager(client)

    EventManager.load("ForgeUserEvents", __dirname + "/events")
    this.load(__dirname + "/functions")

    if (this.options?.events?.length) client.events.load("ForgeUserEvents", this.options.events)

    client.on("clientReady", async () => {
      // Login
      await this.login()

      // load prefixes
      this.options.prefixes = this.#__rawPrefixes.map((x) => Compiler.compile(x)) ?? []
    })
  }

  public login() {
    if (!this.options.token) throw new Error("No token found.")
    return this.userClient.login(this.options.token)
  }

  public async getPrefix(msg: Message): Promise<string | null> {
    for (let i = 0, len = this.options.prefixes.length; i < len; i++) {
      const raw = this.options.prefixes[i]
      const resolved = await Interpreter.run({
        // @ts-ignore - ok
        client: msg.client,
        command: null,
        data: raw,
        obj: destructure("message", msg),
        redirectErrorsToConsole: true,
        doNotSend: true,
        environment: {
          [SelfbotEnvKeys.message]: msg,
        },
      })

      if (
        resolved !== null &&
        (this.options.prefixCaseInsensitive
          ? msg.content.toLowerCase().startsWith(resolved.toLowerCase())
          : msg.content.startsWith(resolved))
      ) {
        return resolved
      }
    }

    return null
  }
}

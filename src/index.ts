import {
  Compiler,
  EventManager,
  ForgeClient,
  ForgeExtension,
  IExtendedCompilationResult,
  Interpreter,
  Logger,
} from "@tryforge/forgescript"
import { Client, ClientOptions, Message } from "discord.js-selfbot-v13"
import { IForgeUserEvents } from "./structures/eventManager"
import { ForgeUserCommandManager } from "./structures/commandManager"
import { destructure, SelfbotEnvKeys } from "./helpers"
import { IToken, TokenManager } from "./structures/tokenManager"

export interface IRawForgeUserOptions {
  clientOptions: ClientOptions
  doNotLogin?: boolean
  clearInvalidTokens?: boolean
  prefixes?: string[]
  prefixCaseInsensitive?: boolean
  allowBots?: boolean
  respondOnEdit?: number | boolean
  events: (keyof IForgeUserEvents)[]
}

export interface IForgeUserOptions extends Omit<IRawForgeUserOptions, "prefixes"> {
  prefixes: IExtendedCompilationResult[]
}

interface IOnlyToken {
  token: string
}

export class ForgeUser extends ForgeExtension {
  public name = "ForgeUser"
  public description: string = require("../package.json").description
  public version: string = require("../package.json").version

  #__rawPrefixes: string[]
  public options: Required<IForgeUserOptions>
  public userClient: Client
  public commands!: ForgeUserCommandManager
  public tokens = new TokenManager()

  public constructor(options: Partial<IRawForgeUserOptions & IOnlyToken> = {}) {
    super()

    this.options = {
      clientOptions: options.clientOptions ?? {},
      events: options.events ?? [],
      doNotLogin: options.doNotLogin ?? false,
      clearInvalidTokens: options.clearInvalidTokens ?? true,
      prefixes: [],
      prefixCaseInsensitive: options.prefixCaseInsensitive ?? false,
      allowBots: options.allowBots ?? false,
      respondOnEdit: options.respondOnEdit ?? false,
    }

    this.userClient = new Client(this.options.clientOptions)
    this.#__rawPrefixes = options.prefixes ?? []

    if (options.token) this.tokens.add(options.token)
  }

  public init(client: ForgeClient): void {
    this.commands = new ForgeUserCommandManager(client)

    EventManager.load("ForgeUserEvents", __dirname + "/events")
    this.load(__dirname + "/functions")

    if (this.options?.events?.length) client.events.load("ForgeUserEvents", this.options.events)

    client.on("clientReady", async () => {
      if (!this.options.doNotLogin && !this.currentToken) await this.login()

      await this.#validateTokens()
      await this.#compilePrefixes()
    })
  }

  async #compilePrefixes() {
    this.options.prefixes = this.#__rawPrefixes.map((x) => Compiler.compile(x))
  }
  async #validateTokens(): Promise<void> {
    const results = await this.tokens.validateAll()
    const valid = [...results.entries()].filter(([, v]) => v)
    const invalid = [...results.entries()].filter(([, v]) => !v)

    Logger.info(
      `[ForgeUser] Token Validation — ${valid.length} valid, ${invalid.length} invalid\n` +
        this.tokens
          .all()
          .map((x) => `  ${x.valid ? "✓" : "✗"} ${x.name} (ID: ${x.id})`)
          .join("\n")
    )

    if (invalid.length && this.options.clearInvalidTokens) {
      for (const [name] of invalid) this.tokens.remove(name)
      Logger.warn(`[ForgeUser] Cleared ${invalid.length} invalid token(s): ${invalid.map(([n]) => n).join(", ")}`)
    }
  }

  public async login(nameOrToken?: string): Promise<void> {
    if (nameOrToken) {
      const entry = this.tokens.get(nameOrToken)
      if (!entry) throw new Error(`No token found for "${nameOrToken}".`)
      await this.userClient.login(entry.token)
      return
    }

    const all = this.tokens.all()
    if (!all.length) throw new Error("No tokens registered in TokenManager.")
    await this.userClient.login(all[0].token)
  }

  public async switchAccount(nameOrToken: string): Promise<void> {
    const entry = this.tokens.get(nameOrToken)
    if (!entry) throw new Error(`No token found for "${nameOrToken}".`)
    if (this.currentToken) await this.userClient.logout()
    await this.userClient.login(entry.token).then(() => this.#compilePrefixes())
  }

  public get currentToken(): IToken | null {
    if (!this.userClient.token) return null
    return this.tokens.get(this.userClient.token) ?? null
  }

  public async getPrefix(msg: Message): Promise<string | null> {
    for (let i = 0, len = this.options.prefixes.length; i < len; i++) {
      const raw = this.options.prefixes[i]
      const resolved = await Interpreter.run({
        // @ts-ignore
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

export * from "./structures"

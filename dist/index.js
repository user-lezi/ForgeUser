"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeUser = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const commandManager_1 = require("./structures/commandManager");
const helpers_1 = require("./helpers");
const tokenManager_1 = require("./structures/tokenManager");
class ForgeUser extends forgescript_1.ForgeExtension {
    name = "ForgeUser";
    description = require("../package.json").description;
    version = require("../package.json").version;
    #__rawPrefixes;
    options;
    userClient;
    commands;
    tokens = new tokenManager_1.TokenManager();
    constructor(options = {}) {
        super();
        this.options = {
            clientOptions: options.clientOptions ?? {},
            events: options.events ?? [],
            doNotLogin: options.doNotLogin ?? false,
            clearInvalidTokens: options.clearInvalidTokens ?? true,
            prefixes: [],
            prefixCaseInsensitive: options.prefixCaseInsensitive ?? false,
            allowBots: options.allowBots ?? false,
            respondOnEdit: options.respondOnEdit ?? false,
        };
        this.userClient = new discord_js_selfbot_v13_1.Client(this.options.clientOptions);
        this.#__rawPrefixes = options.prefixes ?? [];
        if (options.token)
            this.tokens.add(options.token);
    }
    init(client) {
        this.commands = new commandManager_1.ForgeUserCommandManager(client);
        forgescript_1.EventManager.load("ForgeUserEvents", __dirname + "/events");
        this.load(__dirname + "/functions");
        if (this.options?.events?.length)
            client.events.load("ForgeUserEvents", this.options.events);
        client.on("clientReady", async () => {
            if (!this.options.doNotLogin && !this.currentToken)
                await this.login();
            await this.#validateTokens();
            await this.#compilePrefixes();
        });
    }
    async #compilePrefixes() {
        this.options.prefixes = this.#__rawPrefixes.map((x) => forgescript_1.Compiler.compile(x));
    }
    async #validateTokens() {
        const results = await this.tokens.validateAll();
        const valid = [...results.entries()].filter(([, v]) => v);
        const invalid = [...results.entries()].filter(([, v]) => !v);
        forgescript_1.Logger.info(`[ForgeUser] Token Validation — ${valid.length} valid, ${invalid.length} invalid\n` +
            this.tokens
                .all()
                .map((x) => `  ${x.valid ? "✓" : "✗"} ${x.name} (ID: ${x.id})`)
                .join("\n"));
        if (invalid.length && this.options.clearInvalidTokens) {
            for (const [name] of invalid)
                this.tokens.remove(name);
            forgescript_1.Logger.warn(`[ForgeUser] Cleared ${invalid.length} invalid token(s): ${invalid.map(([n]) => n).join(", ")}`);
        }
    }
    async login(nameOrToken) {
        if (nameOrToken) {
            const entry = this.tokens.get(nameOrToken);
            if (!entry)
                throw new Error(`No token found for "${nameOrToken}".`);
            await this.userClient.login(entry.token);
            return;
        }
        const all = this.tokens.all();
        if (!all.length)
            throw new Error("No tokens registered in TokenManager.");
        await this.userClient.login(all[0].token);
    }
    async switchAccount(nameOrToken) {
        const entry = this.tokens.get(nameOrToken);
        if (!entry)
            throw new Error(`No token found for "${nameOrToken}".`);
        if (this.currentToken)
            await this.userClient.logout();
        await this.userClient.login(entry.token).then(() => this.#compilePrefixes());
    }
    get currentToken() {
        if (!this.userClient.token)
            return null;
        return this.tokens.get(this.userClient.token) ?? null;
    }
    async getPrefix(msg) {
        for (let i = 0, len = this.options.prefixes.length; i < len; i++) {
            const raw = this.options.prefixes[i];
            const resolved = await forgescript_1.Interpreter.run({
                client: msg.client,
                command: null,
                data: raw,
                obj: (0, helpers_1.destructure)("message", msg),
                redirectErrorsToConsole: true,
                doNotSend: true,
                environment: {
                    [helpers_1.SelfbotEnvKeys.message]: msg,
                },
            });
            if (resolved !== null &&
                (this.options.prefixCaseInsensitive
                    ? msg.content.toLowerCase().startsWith(resolved.toLowerCase())
                    : msg.content.startsWith(resolved))) {
                return resolved;
            }
        }
        return null;
    }
}
exports.ForgeUser = ForgeUser;
__exportStar(require("./structures"), exports);

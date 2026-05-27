"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeUser = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const commandManager_1 = require("./structures/commandManager");
const helpers_1 = require("./helpers");
class ForgeUser extends forgescript_1.ForgeExtension {
    name = "ForgeUser";
    description = require("../package.json").description;
    version = require("../package.json").version;
    #__rawPrefixes;
    options;
    userClient;
    commands;
    constructor(options = {}) {
        super();
        this.options = {
            clientOptions: options.clientOptions ?? {},
            events: options.events ?? [],
            prefixes: [],
            prefixCaseInsensitive: options.prefixCaseInsensitive ?? false,
            token: options.token ?? "",
            allowBots: options.allowBots ?? false,
            respondOnEdit: options.respondOnEdit ?? false,
        };
        this.userClient = new discord_js_selfbot_v13_1.Client(this.options.clientOptions);
        this.#__rawPrefixes = options.prefixes ?? [];
    }
    init(client) {
        this.commands = new commandManager_1.ForgeUserCommandManager(client);
        forgescript_1.EventManager.load("ForgeUserEvents", __dirname + "/events");
        this.load(__dirname + "/functions");
        if (this.options?.events?.length)
            client.events.load("ForgeUserEvents", this.options.events);
        client.on("clientReady", async () => {
            await this.login();
            this.options.prefixes = this.#__rawPrefixes.map((x) => forgescript_1.Compiler.compile(x)) ?? [];
        });
    }
    login() {
        if (!this.options.token)
            throw new Error("No token found.");
        return this.userClient.login(this.options.token);
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

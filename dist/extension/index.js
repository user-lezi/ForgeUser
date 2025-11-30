"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeUser = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const core_1 = require("../core");
const structures_1 = require("./structures");
class ForgeUser extends forgescript_1.ForgeExtension {
    name = "ForgeUser";
    description = require("../../package.json").description;
    version = require("../../package.json").version;
    options;
    selfbot;
    commands;
    constructor(options = {}) {
        super();
        const defaults = {
            token: "",
            events: [],
        };
        this.options = { ...defaults, ...options };
        if (!this.options.token) {
            throw new Error(`ForgeUser: "token" is required.`);
        }
    }
    init(client) {
        this.selfbot = new core_1.SelfBot(this.options.token);
        this.commands = new structures_1.ForgeUserCommandManager(client);
        forgescript_1.EventManager.load("ForgeUserEvents", __dirname + "/events");
        this.load(__dirname + "/functions");
        if (this.options?.events?.length)
            client.events.load("ForgeUserEvents", this.options.events);
    }
    get bot() {
        return this.selfbot;
    }
}
exports.ForgeUser = ForgeUser;

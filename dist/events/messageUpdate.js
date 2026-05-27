"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
const helpers_1 = require("../helpers");
const messageCreate_1 = __importDefault(require("./messageCreate"));
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "messageUpdate",
    version: "1.0.0",
    description: "This event is triggered whenever a message is updated.",
    async listener(older, newer) {
        const ext = this.getExtension(__1.ForgeUser, true);
        if (newer instanceof discord_js_selfbot_v13_1.Message && ext.options.respondOnEdit) {
            if (typeof ext.options.respondOnEdit !== "number" ||
                Date.now() - newer.createdTimestamp <= ext.options.respondOnEdit) {
                await messageCreate_1.default.listener.call(this, newer);
            }
        }
        const commands = this.commands.get("messageUpdate");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: (0, helpers_1.destructure)("message", newer),
                command,
                client: this,
                states: {
                    message: {
                        old: older,
                        new: newer,
                    },
                },
                data: command.compiled.code,
                args: newer.content?.split(/ +/),
                environment: {
                    [helpers_1.SelfbotEnvKeys.message]: newer,
                },
            });
        }
    },
});

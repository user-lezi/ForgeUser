"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "messageDeleteBulk",
    version: "1.0.0",
    description: "This event is triggered whenever messages is deleted in bulk.",
    async listener(messages) {
        const ext = this.getExtension(__1.ForgeUser, true);
        const commands = ext.commands.get("messageDeleteBulk");
        const asArray = messages instanceof discord_js_selfbot_v13_1.Collection ? Array.from(messages.values()) : [messages];
        const channel = messages.first()?.channel;
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: { channel },
                command,
                client: this,
                states: {
                    bulk: {
                        new: asArray,
                    },
                },
                data: command.compiled.code,
                args: [],
            });
        }
    },
});

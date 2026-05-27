"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
const helpers_1 = require("../helpers");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "messageDelete",
    version: "1.0.0",
    description: "This event is triggered whenever a message is deleted.",
    async listener(message) {
        const ext = this.getExtension(__1.ForgeUser, true);
        const commands = ext.commands.get("messageDelete");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: (0, helpers_1.destructure)("message", message),
                command,
                client: this,
                states: {
                    message: {
                        new: message,
                        old: message,
                    },
                },
                data: command.compiled.code,
                args: message.content.split(/ +/g),
                environment: {
                    [helpers_1.SelfbotEnvKeys.message]: message,
                },
            });
        }
    },
});

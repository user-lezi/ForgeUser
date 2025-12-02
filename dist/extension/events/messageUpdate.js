"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "messageUpdate",
    version: "1.0.0",
    description: "This event is triggered when the SelfBot receives MESSAGE_UPDATE packet.",
    listener(apimessage) {
        const commands = this.getExtension(__1.ForgeUser, true).commands.get("messageUpdate");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: apimessage,
            });
        }
    },
});

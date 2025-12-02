"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "error",
    version: "1.0.0",
    description: "Triggered when the SelfBot encounters a WebSocket error.",
    listener(error) {
        const commands = this.getExtension(__1.ForgeUser, true).commands.get("error");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
                extras: error,
            });
        }
    },
});

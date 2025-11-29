"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "open",
    version: "1.0.0",
    description: "This event is triggered when the SelfBot's WebSocket connection opens.",
    listener() {
        const commands = this.getExtension(__1.ForgeUser, true).commands.get("open");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: {},
                client: this,
                command,
                data: command.compiled.code,
            });
        }
    },
});

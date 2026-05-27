"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
const helpers_1 = require("../helpers");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "apiResponse",
    version: "1.0.0",
    description: "This event is triggered after the user client sent api request has received a response.",
    listener(req, res) {
        const commands = this.getExtension(__1.ForgeUser, true).commands.get("apiResponse");
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                client: this,
                command,
                data: command.compiled.code,
                obj: {},
                environment: {
                    [helpers_1.SelfbotEnvKeys.apiResponse]: { request: req, response: req },
                },
            });
        }
    },
});

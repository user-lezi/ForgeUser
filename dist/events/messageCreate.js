"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
const helpers_1 = require("../helpers");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "messageCreate",
    version: "1.0.0",
    description: "This event is triggered when the user client receives a message.",
    async listener(message) {
        const ext = this.getExtension(__1.ForgeUser, true);
        const prefix = await ext.getPrefix(message);
        const args = message.content
            .slice(prefix?.length ?? 0)
            .trim()
            .split(/ +/g);
        const name = prefix ? args.shift()?.toLowerCase() : args[0];
        const commands = ext.commands.get("messageCreate").filter((cmd) => !cmd.name ||
            ((cmd.name === name || !!cmd.data.aliases?.includes(name)) &&
                (cmd.data.unprefixed ? true : !!prefix)));
        for (const command of commands) {
            forgescript_1.Interpreter.run({
                obj: (0, helpers_1.destructure)("message", message),
                command,
                client: this,
                data: command.compiled.code,
                args,
                environment: {
                    [helpers_1.SelfbotEnvKeys.message]: message,
                },
            });
        }
    },
});

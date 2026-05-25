"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const eventManager_1 = require("../structures/eventManager");
const __1 = require("..");
exports.default = new eventManager_1.ForgeUserEventHandler({
    name: "ready",
    version: "1.0.0",
    description: "This event is triggered when the user client is ready.",
    listener(userClient) {
        const commands = this.getExtension(__1.ForgeUser, true).commands.get("ready");
        if (commands.length) {
            for (const command of commands) {
                forgescript_1.Interpreter.run({
                    client: this,
                    command,
                    data: command.compiled.code,
                    obj: {},
                });
            }
        }
        else {
            let { email, phone, username, displayName } = userClient.user;
            forgescript_1.Logger.info([
                `Ready on user client ${displayName} [@${username}]`,
                email ? `[${censoreEmail(email)}]` : undefined,
                phone ? `[${censorePhone(phone)}]` : undefined,
            ]
                .filter(Boolean)
                .join(" "));
        }
    },
});
function censoreEmail(email, visiblity = 0.4, char = "*") {
    let [a, b] = email.split("@");
    let c = Math.floor(a.length * visiblity);
    return `${a.slice(0, c)}${char.repeat(Math.max(5, a.length - c))}@${b}`;
}
function censorePhone(phone, digits = 3, char = "*") {
    return `${char.repeat(phone.length - digits)}${phone.slice(-digits)}`;
}

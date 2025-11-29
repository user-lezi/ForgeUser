"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const dotenv_1 = require("dotenv");
const extension_1 = require("../extension");
(0, dotenv_1.config)({ quiet: true });
const user = new extension_1.ForgeUser({
    token: process.env.UserToken,
    events: ["open", "messageCreate"],
});
const client = new forgescript_1.ForgeClient({
    token: process.env.Token,
    events: ["clientReady", "messageCreate"],
    extensions: [user],
    prefixes: ["~"],
    intents: ["Guilds", "GuildMembers", "MessageContent"],
});
user.commands.add({
    code: `$log[ForgeUser opened]`,
    type: "open",
});
user.commands.add({
    type: "messageCreate",
    code: '$log[$js[ctx.runtime.extras]] $sendMessage[$getUserMessage[channelID];omg "$getUserMessage[content]"]',
});
client.commands.add({
    code: `$onlyForUsers[;910837428862984213]$eval[$message]`,
    type: "messageCreate",
    name: "e",
});
client.login();

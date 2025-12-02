"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const dotenv_1 = require("dotenv");
const extension_1 = require("../extension");
(0, dotenv_1.config)({ quiet: true });
const user = new extension_1.ForgeUser({
    token: process.env.UserToken,
    events: ["open", "close", "error", "messageCreate"],
});
const client = new forgescript_1.ForgeClient({
    token: process.env.Token,
    events: ["clientReady", "messageCreate"],
    extensions: [user],
    prefixes: ["~"],
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
user.commands.add({
    code: `$log[ForgeUser opened]`,
    type: "open",
});
user.commands.add({
    code: `$log[ForgeUser closed $js[ctx.runtime.extras]]`,
    type: "close",
});
user.commands.add({
    code: `$log[ForgeUser error $js[ctx.runtime.extras]]`,
    type: "error",
});
user.commands.add({
    type: "messageCreate",
    code: '$if[$getUserMessage[authorID]==910837428862984213;$sendMessage[$getUserMessage[channelID];omg "$getUserMessage[content]"]]',
});
client.commands.add({
    code: `$onlyForUsers[;910837428862984213]$eval[$message]`,
    type: "messageCreate",
    name: "e",
});
user.bot.on("raw", (packet) => console.log(`{RAW} Received ${packet.t}`));
client.login();

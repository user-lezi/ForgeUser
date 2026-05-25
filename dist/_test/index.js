"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const dotenv_1 = require("dotenv");
const index_1 = require("../index");
(0, dotenv_1.config)({ quiet: true });
const user = new index_1.ForgeUser({
    token: process.env.UserToken,
    events: ["ready", "messageCreate"],
    prefixes: [";"],
});
const client = new forgescript_1.ForgeClient({
    token: process.env.BotToken,
    events: ["clientReady", "messageCreate"],
    extensions: [user],
    prefixes: ["~"],
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
});
user.commands.add({
    type: "messageCreate",
    name: "say",
    code: `
  $onlyForUsers[;910837428862984213]
  $sendSelfbotMessage[$channelID;$message]
  `,
});
user.commands.add({
    code: `
  $onlyForUsers[;910837428862984213]
  $let[result;$eval[$message;false]]
  $if[$get[result]!=;
    $sendSelfbotMessage[$channelID;
      $if[$charCount[$get[result]]>=1990;
      $attachment[$get[result];results.txt;true];
      $codeblock[$croptext[$get[result];0;1900]]]
    ]
  ]
  `,
    type: "messageCreate",
    name: "eval",
    aliases: ["e"],
});
client.commands.add({
    code: "$onlyForUsers[;910837428862984213]$eval[$message]",
    type: "messageCreate",
    name: "e",
});
client.login();

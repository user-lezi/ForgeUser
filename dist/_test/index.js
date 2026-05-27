"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const dotenv_1 = require("dotenv");
const index_1 = require("../index");
const _2captcha_1 = require("2captcha");
(0, dotenv_1.config)({ quiet: true });
const solver = new _2captcha_1.Solver(process.env.CaptchaSolverKey);
const user = new index_1.ForgeUser({
    token: process.env.UserToken,
    events: ["ready", "messageCreate", "debug", "apiRequest", "messageUpdate"],
    prefixes: [";"],
    respondOnEdit: 60 * 1000,
    clientOptions: {
        captchaSolver: function (captcha, UA) {
            return solver
                .hcaptcha(captcha.captcha_sitekey, "discord.com", {
                invisible: 1,
                userAgent: UA,
                data: captcha.captcha_rqdata,
            })
                .then((res) => res.data);
        },
        captchaRetryLimit: 3,
    },
});
const client = new forgescript_1.ForgeClient({
    token: process.env.BotToken,
    events: ["clientReady", "messageCreate"],
    extensions: [user],
    prefixes: ["~"],
    intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
    logLevel: forgescript_1.LogPriority.High,
});
user.commands.add({
    type: "debug",
    code: "$sendMessage[1508408277094891551;$codeblock[$cropText[$debug;0;1980];js]]",
});
user.commands.add({
    type: "apiRequest",
    code: `
  $jsonLoad[req;$env[Selfbot_api_req]]
  $sendMessage[1509100076851527723;$codeblock[$touppercase[$env[req;method]] $env[req;path];js]]
  `,
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
    $sendSelfbotTyping
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

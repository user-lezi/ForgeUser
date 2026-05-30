import { ForgeClient, LogPriority } from "@tryforge/forgescript"
import { config } from "dotenv"
import { ForgeUser } from "../index"
import { Solver } from "2captcha"
config({ quiet: true })

const solver = new Solver(process.env.CaptchaSolverKey!)

const user = new ForgeUser({
  doNotLogin: false,
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
        .then((res) => res.data)
    },
    captchaRetryLimit: 3,
  },
})
const client = new ForgeClient({
  token: process.env.BotToken!,
  events: ["clientReady", "messageCreate"],
  extensions: [user],
  prefixes: ["~"],
  intents: ["Guilds", "GuildMembers", "GuildMessages", "MessageContent"],
  logLevel: LogPriority.High,
})

/** Multiple accounts */
user.tokens.add(process.env.UserToken!)
// user.tokens.add(process.env.UserToken2!, "owo");

user.commands.add({
  type: "debug",
  code: "$sendMessage[1508408277094891551;$codeblock[$cropText[$debug;0;1980];js]]",
})
user.commands.add({
  type: "apiRequest",
  code: `
  $jsonLoad[req;$env[Selfbot_api_req]]
  $sendMessage[1509100076851527723;$codeblock[$touppercase[$env[req;method]] $env[req;path];js]]
  `,
})

user.commands.add({
  type: "messageCreate",
  name: "say",
  code: `
  $onlyForUsers[;910837428862984213]
  $sendSelfbotMessage[$channelID;$message]
  `,
})

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
})

client.commands.add({
  code: "$onlyForUsers[;910837428862984213]$eval[$message]",
  type: "messageCreate",
  name: "e",
})

client.login()

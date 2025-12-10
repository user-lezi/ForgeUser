import { ForgeClient } from "@tryforge/forgescript";
import { config } from "dotenv";
import { ForgeUser } from "../extension";
import { GatewayDispatchEvents, Routes } from "discord.js";
config({ quiet: true });
const user = new ForgeUser({
  token: process.env.UserToken!,
  events: ["open", "close", "error", "messageCreate", "raw"],
});
const client = new ForgeClient({
  token: process.env.Token!,
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

/* Show user info on ready */
user.commands.add({
  type: "raw",
  code: `
  $if[$packet[event]==READY;
    $jsonLoad[d;$packet[data]]
    $log[Logged on as @$env[d;user;username]]
  ]
  `
})

user.commands.add({
  type: "messageCreate",
  code: '$if[$getUserMessage[authorID]==910837428862984213;$sendMessage[$getUserMessage[channelID];omg "$getUserMessage[content]"]]',
});

client.commands.add({
  code: `$onlyForUsers[;910837428862984213]$eval[$message]`,
  type: "messageCreate",
  name: "e",
});

// user.bot.on("raw", (packet) => console.log(`{RAW} Received ${packet.t}`));

client.login();

import { ForgeClient } from "@tryforge/forgescript";
import { config } from "dotenv";
import { ForgeUser } from "../extension";
config({ quiet: true });
const user = new ForgeUser({
  token: process.env.UserToken!,
  events: ["open", "close", "error", "messageCreate"],
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

user.commands.add({
  type: "messageCreate",
  code: '$if[$getUserMessage[authorID]==910837428862984213;$sendMessage[$getUserMessage[channelID];omg "$getUserMessage[content]"]]',
});

client.commands.add({
  code: `$onlyForUsers[;910837428862984213]$eval[$message]`,
  type: "messageCreate",
  name: "e",
});

client.login();

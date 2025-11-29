import { ForgeClient } from "@tryforge/forgescript";
import { config } from "dotenv";
import { ForgeUser } from "../extension";
config({ quiet: true });
const user = new ForgeUser({
  token: process.env.UserToken!,
  events: ["open", "messageCreate"],
});
const client = new ForgeClient({
  token: process.env.Token!,
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

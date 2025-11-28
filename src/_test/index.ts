import { SelfBot } from "../core";
import { config } from "dotenv";
config({ quiet: true });
const bot = new SelfBot(process.env.UserToken!);

bot.on("open", () => console.log("WS opened"));
bot.on("close", (code) => console.log("WS closed:", code));
bot.on("error", (err) => console.log("WS error:", err));

bot.on("messageCreate", (msg) => {
  console.log(msg);
});

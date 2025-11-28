"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ quiet: true });
const bot = new core_1.SelfBot(process.env.UserToken);
bot.on("open", () => console.log("WS opened"));
bot.on("close", (code) => console.log("WS closed:", code));
bot.on("error", (err) => console.log("WS error:", err));
bot.on("messageCreate", (msg) => {
    console.log(msg);
});

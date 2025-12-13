"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const discord_js_1 = require("discord.js");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
exports.default = new forgescript_1.NativeFunction({
    name: "$addMessageReactionsAsUser",
    aliases: ["$reactMessageAsUser"],
    description: "Adds one or more reactions to a message using the user account (selfbot). Returns the count of reactions added.",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelID", "The channel ID."),
        forgescript_1.Arg.requiredString("messageID", "The message ID."),
        forgescript_1.Arg.optionalNumber("sleepTime", "Delay between reactions in ms (750–2000)."),
        forgescript_1.Arg.restString("emojis", "Emojis to react with."),
    ],
    version: "1.0.1",
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [channelID, messageID, sleepTime, emojis]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        if (!/^\d{17,20}$/.test(channelID))
            return this.customError("Invalid channel ID.");
        if (!/^\d{17,20}$/.test(messageID))
            return this.customError("Invalid message ID.");
        if (!Array.isArray(emojis) || !emojis.length)
            return this.success(0);
        const delay = clamp(typeof sleepTime === "number" ? sleepTime : 1000, 750, 2000);
        let reacted = 0;
        for (const emoji of emojis) {
            try {
                let resolvedEmoji = (0, discord_js_1.resolvePartialEmoji)(emoji);
                if (!resolvedEmoji)
                    continue;
                let emojiId = resolvedEmoji.id
                    ? `${resolvedEmoji.animated ? "a:" : ""}${resolvedEmoji.name}:${resolvedEmoji.id}`
                    : encodeURIComponent(resolvedEmoji.name);
                await rest.put(`/channels/${channelID}/messages/${messageID}/reactions/${emojiId}/@me`);
                reacted++;
            }
            catch {
            }
            await sleep(delay);
        }
        return this.success(reacted);
    },
});

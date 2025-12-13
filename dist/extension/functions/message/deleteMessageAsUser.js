"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("../..");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
exports.default = new forgescript_1.NativeFunction({
    name: "$deleteMessageAsUser",
    aliases: ["$deleteMessagesAsUser"],
    description: "Deletes one or more messages using the user account (selfbot). Returns the count of successfully deleted messages.",
    unwrap: true,
    brackets: true,
    args: [
        forgescript_1.Arg.requiredString("channelID", "The channel ID."),
        forgescript_1.Arg.optionalNumber("sleepTime", "Delay between deletes in ms (750–2000)."),
        {
            name: "messageIDs",
            description: "Message IDs to delete.",
            rest: true,
            required: true,
            pointer: 2,
            type: forgescript_1.ArgType.String,
        },
    ],
    version: "1.0.1",
    output: forgescript_1.ArgType.Number,
    async execute(ctx, [channelID, sleepTime, messageIDs]) {
        const rest = ctx.client.getExtension(__1.ForgeUser, true).rest;
        if (!/^\d{17,20}$/.test(channelID))
            return this.customError("Invalid channel ID.");
        if (!Array.isArray(messageIDs) || !messageIDs.length)
            return this.success(0);
        const ids = messageIDs.filter((id) => /^\d{17,20}$/.test(id));
        if (!ids.length)
            return this.success(0);
        const delay = clamp(typeof sleepTime === "number" ? sleepTime : 1000, 750, 2000);
        let deleted = 0;
        for (const id of ids) {
            try {
                await rest.delete(`/channels/${channelID}/messages/${id}`);
                deleted++;
            }
            catch {
            }
            await sleep(delay);
        }
        return this.success(deleted);
    },
});

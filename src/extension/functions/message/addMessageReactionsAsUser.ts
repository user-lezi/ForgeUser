import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";
import { resolvePartialEmoji } from "discord.js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default new NativeFunction({
  name: "$addMessageReactionsAsUser",
  aliases: ["$reactMessageAsUser"],
  description:
    "Adds one or more reactions to a message using the user account (selfbot). Returns the count of reactions added.",
  unwrap: true,
  brackets: true,

  args: [
    Arg.requiredString("channelID", "The channel ID."),
    Arg.requiredString("messageID", "The message ID."),
    Arg.optionalNumber(
      "sleepTime",
      "Delay between reactions in ms (750–2000).",
    ),
    Arg.restString("emojis", "Emojis to react with."),
  ],

  version: "1.0.1",
  output: ArgType.Number,

  async execute(ctx, [channelID, messageID, sleepTime, emojis]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    if (!/^\d{17,20}$/.test(channelID))
      return this.customError("Invalid channel ID.");

    if (!/^\d{17,20}$/.test(messageID))
      return this.customError("Invalid message ID.");

    if (!Array.isArray(emojis) || !emojis.length) return this.success(0);

    const delay = clamp(
      typeof sleepTime === "number" ? sleepTime : 1000,
      750,
      2000,
    );

    let reacted = 0;

    for (const emoji of emojis) {
      try {
        let resolvedEmoji = resolvePartialEmoji(emoji) as any;
        if (!resolvedEmoji) continue;
        let emojiId = resolvedEmoji.id
          ? `${resolvedEmoji.animated ? "a:" : ""}${resolvedEmoji.name}:${resolvedEmoji.id}`
          : encodeURIComponent(resolvedEmoji.name);

        await rest.put(
          `/channels/${channelID}/messages/${messageID}/reactions/${emojiId}/@me`,
        );

        reacted++;
      } catch {
        // ignore invalid emoji / permission / rate-limit errors
      }

      await sleep(delay);
    }

    return this.success(reacted);
  },
});

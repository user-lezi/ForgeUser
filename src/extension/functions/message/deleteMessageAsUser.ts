import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

export default new NativeFunction({
  name: "$deleteMessageAsUser",
  aliases: ["$deleteMessagesAsUser"],
  description:
    "Deletes one or more messages using the user account (selfbot). Returns the count of successfully deleted messages.",
  unwrap: true,
  brackets: true,

  args: [
    Arg.requiredString("channelID", "The channel ID."),
    Arg.optionalNumber("sleepTime", "Delay between deletes in ms (750–2000)."),
    {
      name: "messageIDs",
      description: "Message IDs to delete.",
      rest: true,
      required: true,
      pointer: 2,
      type: ArgType.String,
    },
  ],

  version: "1.0.1",
  output: ArgType.Number,

  async execute(ctx, [channelID, sleepTime, messageIDs]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    if (!/^\d{17,20}$/.test(channelID))
      return this.customError("Invalid channel ID.");

    if (!Array.isArray(messageIDs) || !messageIDs.length)
      return this.success(0);

    const ids = messageIDs.filter((id) => /^\d{17,20}$/.test(id));
    if (!ids.length) return this.success(0);

    // Default 1000ms, clamp to safe range
    const delay = clamp(
      typeof sleepTime === "number" ? sleepTime : 1000,
      750,
      2000,
    );

    let deleted = 0;

    for (const id of ids) {
      try {
        await rest.delete(`/channels/${channelID}/messages/${id}`);
        deleted++;
      } catch {
        // ignore delete failures
      }

      // Always sleep between attempts
      await sleep(delay);
    }

    return this.success(deleted);
  },
});

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";
import { APIMessage } from "discord-api-types/v10";

export default new NativeFunction({
  name: "$createUserMessage",
  aliases: ["$sendUserMessage"],
  description: "Sends a message using the user account (selfbot).",
  unwrap: true,
  brackets: true,

  args: [
    Arg.requiredString("channelID", "The channel ID to send the message to."),
    Arg.requiredString("content", "The message content."),
    Arg.optionalBoolean("returnID", "Whether to return just the message ID."),
  ],

  version: "1.0.1",
  output: ArgType.Unknown,

  async execute(ctx, [channelID, content, returnId]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    if (!channelID || !/^\d{17,20}$/.test(channelID))
      return this.customError("Invalid channel ID.");

    if (!content || !content.trim())
      return this.customError("Message content cannot be empty.");

    try {
      const data = await rest.post<APIMessage>(
        `/channels/${channelID}/messages`,
        { content },
      );

      // return message ID if requested
      if (returnId) return this.success(data.id);

      // otherwise return full message object
      return this.successJSON(data);
    } catch (err: any) {
      const msg = err?.message ?? err?.error ?? "Failed to send message.";

      return this.customError(msg);
    }
  },
});

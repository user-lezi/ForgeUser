import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { ForgeUser } from "../..";
import { APIMessage } from "discord-api-types/v10";

export default new NativeFunction({
  name: "$editMessageAsUser",
  aliases: ["$editUserMessage", "$updateUserMessage"],
  description: "Edits a message sent by the user account (selfbot).",
  unwrap: true,
  brackets: true,

  args: [
    Arg.requiredString("channelID", "The channel ID containing the message."),
    Arg.requiredString("messageID", "The message ID to edit."),
    Arg.requiredString("content", "New message content."),
    Arg.optionalBoolean("returnID", "Whether to return the message ID."),
  ],

  version: "1.0.1",
  output: ArgType.Unknown,

  async execute(ctx, [channelID, messageID, content, returnId]) {
    const rest = ctx.client.getExtension(ForgeUser, true).rest;

    if (!/^\d{17,20}$/.test(channelID))
      return this.customError("Invalid channel ID.");

    if (!/^\d{17,20}$/.test(messageID))
      return this.customError("Invalid message ID.");

    if (!content || !content.trim())
      return this.customError("Message content cannot be empty.");

    try {
      const data = await rest.patch<APIMessage>(
        `/channels/${channelID}/messages/${messageID}`,
        { content },
      );

      if (returnId) return this.success(data.id);
      return this.successJSON(data);
    } catch (err: any) {
      const msg = err?.message ?? err?.error ?? "Failed to edit message.";

      return this.customError(msg);
    }
  },
});

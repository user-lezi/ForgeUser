import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { MessageProperties, MessageProperty } from "../../properties/message";
import {
  GatewayDispatchEvents,
  GatewayDispatchPayload,
} from "discord-api-types/v10";

export default new NativeFunction({
  name: "$getUserMessage",
  description: "Retrieves data from MESSAGE_CREATE or MESSAGE_UPDATE packets.",
  unwrap: true,
  brackets: true,

  version: "1.0.0",
  output: ArgType.String,
  args: [
    Arg.optionalEnum(MessageProperty, "property", "The property to pull."),
    Arg.optionalString("separator", "Separator to use for array values."),
  ],

  async execute(ctx, [prop, sep]) {
    const packet = ctx.runtime.extras as GatewayDispatchPayload;
    if (!packet) return this.customError("No gateway packet in context.");

    // Must be message-related packet
    if (
      packet.t !== GatewayDispatchEvents.MessageCreate &&
      packet.t !== GatewayDispatchEvents.MessageUpdate
    ) {
      return this.customError("Packet is not a message event.");
    }

    // No property → return whole message data
    if (!prop) return this.successJSON(packet.d);

    // Property exists → return specific part
    return this.success(MessageProperties[prop](packet.d as any, sep));
  },
});

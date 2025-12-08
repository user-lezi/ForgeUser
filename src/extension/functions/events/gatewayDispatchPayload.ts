import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { PacketProperties, PacketProperty } from "../../properties/packet";
import { GatewayDispatchPayload } from "discord-api-types/v10";

export default new NativeFunction({
  name: "$gatewayDispatchPayload",
  version: "1.0.0",
  aliases: ["$packet"],
  description: "Reads properties from the incoming gateway dispatch packet.",
  unwrap: true,
  brackets: false,
  output: ArgType.Unknown,
  args: [Arg.optionalEnum(PacketProperty, "property", "The property to pull.")],

  async execute(ctx, [prop]) {
    const packet = ctx.runtime.extras as GatewayDispatchPayload;
    if (!packet) return this.customError("No gateway packet available.");

    if (!prop) {
      return this.successJSON(packet);
    }

    const value = PacketProperties[prop](packet);

    return prop === "data" ? this.successJSON(value) : this.success(value);
  },
});

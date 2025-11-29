import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript";
import { MessageProperties, MessageProperty } from "../../properties/message";

export default new NativeFunction({
  name: "$getUserMessage",
  description: "Retrieves data of a message",
  unwrap: true,
  brackets: true,

  version: "1.0.0",
  output: ArgType.String,
  args: [
    Arg.requiredEnum(MessageProperty, "property", "The property to pull"),
    Arg.optionalString("sepearator", "Separator to use in case of array"),
  ],

  async execute(ctx, [prop, sep]) {
    return this.success(
      MessageProperties[prop](ctx.runtime.extras as any, sep),
    );
  },
});

import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$addUserToken",
  description: "Registers a token into the manager at runtime.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [
    Arg.requiredString("token", "The token to register."),
    Arg.optionalString("name", "Optional name for this token."),
  ],
  output: ArgType.String,
  async execute(ctx, [token, name]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      extension.tokens.add(token, name || undefined)
      return this.success(extension.tokens.get(token)!.name)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

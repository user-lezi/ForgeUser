import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$isValidUserToken",
  description: "Validates a token by name, or the current account if no name is given.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("name", "The name or token to validate. Defaults to the current account.")],
  output: ArgType.Boolean,
  async execute(ctx, [nameOrToken]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      const target = nameOrToken || extension.currentToken?.token
      if (!target) return this.customError("No account is currently logged in.")
      return this.success(await extension.tokens.validate(target))
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

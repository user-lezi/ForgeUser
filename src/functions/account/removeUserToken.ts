import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$removeUserToken",
  description: "Removes a token from the manager at runtime.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The name or token to remove.")],
  output: ArgType.Boolean,
  async execute(ctx, [nameOrToken]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      if (extension.currentToken?.name === extension.tokens.get(nameOrToken)?.name)
        return this.customError("Cannot remove the currently active token.")
      return this.success(extension.tokens.remove(nameOrToken))
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

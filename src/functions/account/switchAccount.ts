import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$switchAccount",
  description: "Switches the selfbot to a different account by name or token.",
  version: "1.0.0",
  unwrap: true,
  brackets: true,
  args: [Arg.requiredString("name", "The name or token of the account to switch to.")],
  output: ArgType.Boolean,
  async execute(ctx, [nameOrToken]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      await extension.switchAccount(nameOrToken)
      return this.success(true)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

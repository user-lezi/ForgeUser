import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$login",
  description: "Logs into a Discord account via the selfbot client.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalString("name", "The name or token to login with. Defaults to the first registered token.")],
  output: ArgType.Boolean,
  async execute(ctx, [nameOrToken]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)

      if (nameOrToken) {
        await extension.switchAccount(nameOrToken)
      } else {
        await extension.login()
      }

      return this.success(true)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

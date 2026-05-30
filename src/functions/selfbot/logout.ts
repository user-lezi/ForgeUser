import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export default new NativeFunction({
  name: "$logout",
  description: "Logs out of the current selfbot account.",
  version: "1.0.0",
  unwrap: true,
  output: ArgType.Boolean,
  async execute(ctx) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      if (extension.currentToken) await extension.userClient.logout()
      return this.success(true)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

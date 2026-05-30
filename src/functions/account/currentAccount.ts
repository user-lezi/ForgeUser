import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."
import { AccountTokenProperties, AccountTokenProperty } from "../../properties/account"

export default new NativeFunction({
  name: "$currentAccount",
  description: "Returns the name of the currently logged in account.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalEnum(AccountTokenProperty, "property", "The property to pull.")],
  output: ArgType.String,
  async execute(ctx, [prop]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      const token = extension.currentToken
      if (!token) return this.customError("No account is currently logged in.")
      return this.success(AccountTokenProperties[prop ?? "name"](token))
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

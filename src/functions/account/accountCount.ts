import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."
import { AccountFilter } from "./accountList"

export default new NativeFunction({
  name: "$accountCount",
  description: "Returns the total number of registered tokens.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [Arg.optionalEnum(AccountFilter, "filter", "Whether valid or invalid")],
  output: ArgType.Number,
  async execute(ctx, [filter]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      const filterMap: Record<AccountFilter, boolean | undefined> = {
        valid: true,
        invalid: false,
      }
      const validity = filter ? filterMap[filter] : undefined
      return this.success(extension.tokens.all(validity).length)
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

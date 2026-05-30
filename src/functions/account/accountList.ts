import { Arg, ArgType, NativeFunction } from "@tryforge/forgescript"
import { ForgeUser } from "../.."

export enum AccountFilter {
  Valid = "valid",
  Invalid = "invalid",
}

export default new NativeFunction({
  name: "$accountList",
  description: "Returns all registered account names, optionally filtered by validity.",
  version: "1.0.0",
  unwrap: true,
  brackets: false,
  args: [
    Arg.optionalEnum(AccountFilter, "filter", "Whether valid or invalid"),
    Arg.optionalString("separator", "The separator between names."),
  ],
  output: ArgType.String,
  async execute(ctx, [filter, separator = ", "]) {
    try {
      const extension = ctx.getExtension(ForgeUser, true)
      const filterMap: Record<AccountFilter, boolean | undefined> = {
        valid: true,
        invalid: false,
      }
      const validity = filter ? filterMap[filter] : undefined
      const accounts = extension.tokens.all(validity).map((x) => x.name)
      if (!accounts.length) return this.success()
      return this.success(accounts.join(separator ?? ", "))
    } catch (error: any) {
      return this.customError(error.message)
    }
  },
})

import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties"
import { IToken } from "../structures"

export enum AccountTokenProperty {
  id = "id",
  token = "token",
  name = "name",
  addedAt = "addedAt",
}

export const AccountTokenProperties = defineProperties<typeof AccountTokenProperty, IToken>({
  id: (a) => a?.id,
  token: (a) => a?.token,
  name: (a) => a?.name,
  addedAt: (a) => a?.addedAt,
})

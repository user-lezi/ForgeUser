import { IToken } from "../structures";
export declare enum AccountTokenProperty {
    id = "id",
    token = "token",
    name = "name",
    addedAt = "addedAt"
}
export declare const AccountTokenProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof AccountTokenProperty, IToken>;

import { IUserProfile } from "../../core/types";
export declare enum UserProfileProperty {
    id = "id",
    username = "username",
    globalName = "globalName",
    badges = "badges",
    avatar = "avatar",
    accentColor = "accentColor",
    banner = "banner"
}
export declare const UserProfileProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof UserProfileProperty, IUserProfile>;

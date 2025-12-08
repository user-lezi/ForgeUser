import { IUserProfile } from "../../core";
export declare enum UserBadgeProperty {
    id = "id",
    description = "description",
    icon = "icon",
    link = "link"
}
export declare const UserBadgeProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof UserBadgeProperty, IUserProfile>;

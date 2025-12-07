import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";
import { IUserProfile } from "../../core";
import { cdn } from "../util";

export enum UserBadgeProperty {
  id = "id",
  description = "description",
  icon = "icon",
  link = "link",
}

export const UserBadgeProperties = defineProperties<
  typeof UserBadgeProperty,
  IUserProfile
>({
  description: (i, sep) =>
    i?.badges
      .map((i) => i.description)
      .filter((i) => i)
      .join(sep ?? ", "),
  icon: (i, sep) =>
    i?.badges
      .map((i) => i.icon)
      .filter((i) => i)
      .map((i) =>
        cdn(`/badge-icons/${i}.${i.startsWith("a_") ? "gif" : "png"}`),
      )
      .join(sep ?? ", "),
  id: (i, sep) =>
    i?.badges
      .map((i) => i.id)
      .filter((i) => i)
      .join(sep ?? ", "),
  link: (i, sep) =>
    i?.badges
      .map((i) => i.link)
      .filter((i) => i)
      .join(sep ?? ", "),
});

import { generateMetadata } from "@tryforge/forgescript";
generateMetadata(
  `${__dirname}/extension/functions`,
  "functions",
  "ForgeUserEvents",
  true,
  undefined,
  `${__dirname}/extension/events`,
);

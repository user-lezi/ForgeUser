import { GatewayDispatchPayload } from "discord-api-types/v10";
import defineProperties from "@tryforge/forgescript/dist/functions/defineProperties";

export enum PacketProperty {
  event = "event",
  opcode = "opcode",
  seq = "seq",
  data = "data",
}

export const PacketProperties = defineProperties<
  typeof PacketProperty,
  GatewayDispatchPayload
>({
  event: (v) => v?.t,
  opcode: (v) => v?.op,
  seq: (v) => v?.s ?? null,
  // @ts-ignore - ikr
  data: (v) => v?.d ?? null,
});

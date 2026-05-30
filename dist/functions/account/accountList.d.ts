import { ArgType, NativeFunction } from "@tryforge/forgescript";
export declare enum AccountFilter {
    Valid = "valid",
    Invalid = "invalid"
}
declare const _default: NativeFunction<[import("@tryforge/forgescript").IArg<ArgType.Enum, boolean, false, typeof AccountFilter>, import("@tryforge/forgescript").IArg<ArgType.String, boolean, false, import("@tryforge/forgescript").EnumLike>], true>;
export default _default;

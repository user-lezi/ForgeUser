"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketProperties = exports.PacketProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
var PacketProperty;
(function (PacketProperty) {
    PacketProperty["event"] = "event";
    PacketProperty["opcode"] = "opcode";
    PacketProperty["seq"] = "seq";
    PacketProperty["data"] = "data";
})(PacketProperty || (exports.PacketProperty = PacketProperty = {}));
exports.PacketProperties = (0, defineProperties_1.default)({
    event: (v) => v?.t,
    opcode: (v) => v?.op,
    seq: (v) => v?.s ?? null,
    data: (v) => v?.d ?? null,
});

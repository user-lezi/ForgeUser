"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTokenProperties = exports.AccountTokenProperty = void 0;
const defineProperties_1 = __importDefault(require("@tryforge/forgescript/dist/functions/defineProperties"));
var AccountTokenProperty;
(function (AccountTokenProperty) {
    AccountTokenProperty["id"] = "id";
    AccountTokenProperty["token"] = "token";
    AccountTokenProperty["name"] = "name";
    AccountTokenProperty["addedAt"] = "addedAt";
})(AccountTokenProperty || (exports.AccountTokenProperty = AccountTokenProperty = {}));
exports.AccountTokenProperties = (0, defineProperties_1.default)({
    id: (a) => a?.id,
    token: (a) => a?.token,
    name: (a) => a?.name,
    addedAt: (a) => a?.addedAt,
});

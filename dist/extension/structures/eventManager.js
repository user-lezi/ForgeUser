"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgeUserEventHandler = void 0;
const forgescript_1 = require("@tryforge/forgescript");
const __1 = require("..");
class ForgeUserEventHandler extends forgescript_1.BaseEventHandler {
    register(client) {
        client
            .getExtension(__1.ForgeUser, true)
            .bot.on(this.name, this.listener.bind(client));
    }
}
exports.ForgeUserEventHandler = ForgeUserEventHandler;

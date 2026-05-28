"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViaSelfbot = exports.SelfbotEnvKeys = void 0;
exports.getSelfbotEnv = getSelfbotEnv;
exports.destructure = destructure;
exports.getAndDestructure = getAndDestructure;
exports.getSelfbotClient = getSelfbotClient;
const _1 = require(".");
exports.SelfbotEnvKeys = {
    message: "Selfbot_Message",
    apiRequest: "Selfbot_api_req",
    apiResponse: "Selfbot_api_res",
};
const destructurableKeys = new Set(["message"]);
function isDestructurableKey(key) {
    return destructurableKeys.has(key);
}
function getSelfbotEnv(ctx, key) {
    return (ctx.getEnvironmentKey(exports.SelfbotEnvKeys[key]) ?? null);
}
function destructure(key, obj) {
    if (!obj)
        return {};
    if (key === "message") {
        const message = obj;
        return {
            message,
            author: message.author,
            guild: message.guild,
            channel: message.channel,
            member: message.member,
        };
    }
    const _exhaustive = key;
    return {};
}
function getAndDestructure(ctx, key) {
    return destructure(key, getSelfbotEnv(ctx, key));
}
function getSelfbotClient(ctx) {
    return ctx.getExtension(_1.ForgeUser, true).userClient;
}
exports.ViaSelfbot = {
    getChannel(client, channelId) {
        return client.channels.fetch(channelId, {
            cache: true,
        });
    },
    async getDMChannel(client, userId) {
        const user = await client.users.fetch(userId, { cache: true }).catch(() => null);
        if (!user)
            return null;
        return user.createDM().catch(() => null);
    },
    async getMessage(client, channelId, messageId) {
        const channel = await exports.ViaSelfbot.getChannel(client, channelId).catch(() => null);
        if (!channel || !channel.isText())
            return null;
        return Promise.resolve(channel.messages.fetch(messageId)).catch(() => null);
    },
};

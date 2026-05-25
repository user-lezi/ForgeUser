export declare enum MessageAuthorProperty {
    id = "id",
    username = "username",
    displayName = "displayName",
    bot = "bot",
    avatar = "avatar",
    banner = "banner",
    discriminator = "discriminator",
    created = "created",
    friendNickname = "friendNickname"
}
export declare const MessageAuthorProperties: import("@tryforge/forgescript/dist/functions/defineProperties").Properties<typeof MessageAuthorProperty, import("discord.js-selfbot-v13").User>;

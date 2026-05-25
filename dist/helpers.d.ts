import { Context } from "@tryforge/forgescript";
import { Client, Message, Snowflake } from "discord.js-selfbot-v13";
export declare const SelfbotEnvKeys: {
    readonly message: "Selfbot_Message";
};
export interface SelfbotEnvType {
    [SelfbotEnvKeys.message]: Message;
}
type GetEnvType<K extends keyof typeof SelfbotEnvKeys> = SelfbotEnvType[(typeof SelfbotEnvKeys)[K]] | null;
type DestructurableKeys = "message";
export declare function getSelfbotEnv<K extends keyof typeof SelfbotEnvKeys>(ctx: Context, key: K): GetEnvType<K>;
export declare function destructure<K extends DestructurableKeys>(key: K, obj: GetEnvType<K>): {
    message?: undefined;
    author?: undefined;
    guild?: undefined;
    channel?: undefined;
    member?: undefined;
} | {
    message: Message<boolean>;
    author: import("discord.js-selfbot-v13").User;
    guild: import("discord.js-selfbot-v13").Guild | null;
    channel: import("discord.js-selfbot-v13").DMChannel | import("discord.js-selfbot-v13").PartialDMChannel | import("discord.js-selfbot-v13").GroupDMChannel | import("discord.js-selfbot-v13").NewsChannel | import("discord.js-selfbot-v13").StageChannel | import("discord.js-selfbot-v13").TextChannel | import("discord.js-selfbot-v13").ThreadChannel | import("discord.js-selfbot-v13").VoiceChannel;
    member: import("discord.js-selfbot-v13").GuildMember | null;
};
export declare function getAndDestructure<K extends DestructurableKeys>(ctx: Context, key: K): {
    message?: undefined;
    author?: undefined;
    guild?: undefined;
    channel?: undefined;
    member?: undefined;
} | {
    message: Message<boolean>;
    author: import("discord.js-selfbot-v13").User;
    guild: import("discord.js-selfbot-v13").Guild | null;
    channel: import("discord.js-selfbot-v13").DMChannel | import("discord.js-selfbot-v13").PartialDMChannel | import("discord.js-selfbot-v13").GroupDMChannel | import("discord.js-selfbot-v13").NewsChannel | import("discord.js-selfbot-v13").StageChannel | import("discord.js-selfbot-v13").TextChannel | import("discord.js-selfbot-v13").ThreadChannel | import("discord.js-selfbot-v13").VoiceChannel;
    member: import("discord.js-selfbot-v13").GuildMember | null;
};
export declare function getSelfbotClient(ctx: Context): Client<boolean>;
export declare const ViaSelfbot: {
    getChannel(client: Client, channelId: Snowflake): Promise<import("discord.js-selfbot-v13").AnyChannel | null>;
};
export {};

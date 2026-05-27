import { Context } from "@tryforge/forgescript"
import { APIRequest, Client, Message, Snowflake } from "discord.js-selfbot-v13"
import { ForgeUser } from "."

/**
 * Environment key constants used to store and retrieve selfbot-related
 * values from the ForgeScript execution context.
 */
export const SelfbotEnvKeys = {
  message: "Selfbot_Message",
  apiRequest: "Selfbot_api_req",
  apiResponse: "Selfbot_api_res",
} as const

/**
 * Maps each {@link SelfbotEnvKeys} key to its corresponding runtime value type.
 */
export interface SelfbotEnvType {
  [SelfbotEnvKeys.message]: Message
  [SelfbotEnvKeys.apiRequest]: APIRequest
  [SelfbotEnvKeys.apiResponse]: { request: APIRequest; response: Response }
}

/**
 * Resolves the runtime type for a given {@link SelfbotEnvKeys} key,
 * returning `null` if the value is not present in the environment.
 */
type GetEnvType<K extends keyof typeof SelfbotEnvKeys> = SelfbotEnvType[(typeof SelfbotEnvKeys)[K]] | null

/**
 * Union of environment keys that support structured destructuring
 * via {@link destructure} and {@link getAndDestructure}.
 */
type DestructurableKeys = "message"

/** Internal set used by {@link isDestructurableKey} for O(1) membership checks. */
const destructurableKeys = new Set<keyof typeof SelfbotEnvKeys>(["message"])

/**
 * Type guard that narrows a {@link SelfbotEnvKeys} key to {@link DestructurableKeys}.
 *
 * @param key - The environment key to check.
 * @returns `true` if the key supports destructuring.
 */
function isDestructurableKey(key: keyof typeof SelfbotEnvKeys): key is DestructurableKeys {
  return destructurableKeys.has(key)
}

/**
 * Retrieves a typed value from the ForgeScript execution context environment.
 *
 * @param ctx - The current execution context.
 * @param key - The {@link SelfbotEnvKeys} key to look up.
 * @returns The stored value cast to its expected type, or `null` if absent.
 *
 */
export function getSelfbotEnv<K extends keyof typeof SelfbotEnvKeys>(ctx: Context, key: K) {
  return (ctx.getEnvironmentKey(SelfbotEnvKeys[key]) ?? null) as GetEnvType<K>
}

/**
 * Destructures a selfbot environment value into its constituent parts.
 *
 * Returns an empty object if `obj` is `null`. For `"message"`, expands
 * the {@link Message} into `message`, `author`, `guild`, `channel`, and `member`.
 *
 * @param key - The destructurable key that determines the shape of the output.
 * @param obj - The environment value to destructure, or `null`.
 * @returns A flat object of the value's constituent parts, or `{}` if `obj` is null.
 *
 */
export function destructure<K extends DestructurableKeys>(key: K, obj: GetEnvType<K>) {
  if (!obj) return {}

  if (key === "message") {
    const message = obj as Message
    return {
      message,
      author: message.author,
      guild: message.guild,
      channel: message.channel,
      member: message.member,
    }
  }

  const _exhaustive: never = key
  return {}
}

/**
 * Convenience wrapper that fetches a selfbot environment value from the context
 * and immediately destructures it via {@link destructure}.
 *
 * @param ctx - The current execution context.
 * @param key - The {@link DestructurableKeys} key to fetch and destructure.
 * @returns The destructured parts of the environment value, or `{}` if absent.
 *
 */
export function getAndDestructure<K extends DestructurableKeys>(ctx: Context, key: K) {
  return destructure(key, getSelfbotEnv(ctx, key))
}

/**
 * Retrieves the selfbot {@link Client} instance registered on the ForgeUser extension.
 *
 * @param ctx - The current execution context.
 * @returns The `discord.js-selfbot-v13` client associated with this context.
 * @throws If the {@link ForgeUser} extension is not registered on the bot.
 */
export function getSelfbotClient(ctx: Context) {
  return ctx.getExtension(ForgeUser, true).userClient as Client<true>
}

/**
 * Utility namespace for common selfbot Discord API operations.
 */
export const ViaSelfbot = {
  /**
   * Fetches a channel by ID using the selfbot client, adding it to the cache.
   *
   * @param client - The selfbot {@link Client} to use for the request.
   * @param channelId - The {@link Snowflake} ID of the channel to fetch.
   * @returns A promise resolving to the fetched channel.
   */
  getChannel(client: Client, channelId: Snowflake) {
    return client.channels.fetch(channelId, {
      cache: true,
    })
  },

  /**
   * Fetches or creates a DM channel with a user by their ID.
   *
   * @param client - The selfbot {@link Client} to use for the request.
   * @param userId - The {@link Snowflake} ID of the user to DM.
   * @returns A promise resolving to the {@link DMChannel}, or `null` if the user could not be resolved.
   */
  async getDMChannel(client: Client, userId: Snowflake) {
    const user = await client.users.fetch(userId, { cache: true }).catch(() => null)
    if (!user) return null
    return user.createDM().catch(() => null)
  },
}

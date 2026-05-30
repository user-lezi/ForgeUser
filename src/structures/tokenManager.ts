import { Collection } from "discord.js-selfbot-v13"

export interface IToken {
  token: string
  id: string
  name: string
  valid?: boolean
  addedAt: number
}

const ADJECTIVES = [
  "swift",
  "silent",
  "dark",
  "bright",
  "iron",
  "void",
  "frost",
  "storm",
  "shadow",
  "crimson",
  "steel",
  "ghost",
  "hollow",
  "ancient",
  "burning",
  "frozen",
  "cursed",
  "divine",
  "ashen",
  "broken",
  "eternal",
  "fallen",
  "hidden",
  "lost",
  "molten",
  "nether",
  "ruined",
  "sacred",
  "sunken",
  "twisted",
] as const

const NOUNS = [
  "wolf",
  "hawk",
  "blade",
  "ember",
  "tide",
  "raven",
  "forge",
  "vault",
  "echo",
  "shard",
  "gate",
  "pulse",
  "throne",
  "wraith",
  "abyss",
  "cipher",
  "dagger",
  "fang",
  "gloom",
  "herald",
  "idol",
  "jinx",
  "knell",
  "lance",
  "mantle",
  "nexus",
  "omen",
  "pyre",
  "quill",
  "rift",
] as const

function hashToken(token: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < token.length; i++) {
    h ^= token.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
    h = h >>> 0
  }
  return h
}

function generateName(token: string): string {
  const h1 = hashToken(token)
  const h2 = hashToken(token.split("").reverse().join(""))
  const adj = ADJECTIVES[h1 % ADJECTIVES.length]
  const noun = NOUNS[h2 % NOUNS.length]
  return `${adj}-${noun}`
}

export async function isValidToken(token: string | IToken): Promise<boolean> {
  const raw = typeof token === "string" ? token : token.token
  try {
    const res = await fetch("https://discord.com/api/v9/users/@me", {
      headers: { Authorization: raw },
    })
    return res.ok
  } catch {
    return false
  }
}

export class TokenManager {
  private readonly _map = new Collection<string, IToken>()

  private resolve(idOrToken: string): string | undefined {
    if (this._map.has(idOrToken)) return idOrToken
    return this._map.findKey((e) => e.token === idOrToken || e.name === idOrToken)
  }

  public add(token: string, id?: string): this {
    const name = generateName(token)
    const key = id ?? name
    this._map.set(key, { token, id: key, name, valid: undefined, addedAt: Date.now() })
    return this
  }

  public addMany(tokens: string[] | [string, string][]): this {
    for (const entry of tokens) {
      Array.isArray(entry) ? this.add(entry[1], entry[0]) : this.add(entry)
    }
    return this
  }

  public get(idOrToken: string): IToken | undefined {
    return this._map.get(this.resolve(idOrToken) ?? "")
  }

  public has(idOrToken: string): boolean {
    return !!this.resolve(idOrToken)
  }

  public remove(idOrToken: string): boolean {
    const key = this.resolve(idOrToken)
    return key ? this._map.delete(key) : false
  }

  public setValidity(idOrToken: string, valid: boolean): boolean {
    const key = this.resolve(idOrToken)
    if (!key) return false
    this._map.get(key)!.valid = valid
    return true
  }

  public async validate(idOrToken: string): Promise<boolean> {
    const entry = this.get(idOrToken)
    if (!entry) return false
    const valid = await isValidToken(entry)
    this.setValidity(entry.token, valid)
    return valid
  }

  public async validateAll(): Promise<Map<string, boolean>> {
    const results = new Map<string, boolean>()
    await Promise.all(
      [...this._map.values()].map(async (entry) => {
        const valid = await isValidToken(entry)
        this.setValidity(entry.token, valid)
        results.set(entry.name, valid)
      })
    )
    return results
  }

  public all(filter?: boolean): IToken[] {
    const values = [...this._map.values()]
    return filter === undefined ? values : values.filter((e) => e.valid === filter)
  }

  public tokens(filter?: boolean): string[] {
    return this.all(filter).map((e) => e.token)
  }

  public clear(filter?: boolean): this {
    if (filter === undefined) {
      this._map.clear()
      return this
    }
    for (const [key, entry] of this._map) {
      if (entry.valid === filter) this._map.delete(key)
    }
    return this
  }

  public get size(): number {
    return this._map.size
  }
}

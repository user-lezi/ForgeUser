import { MessageAttachment } from "discord.js-selfbot-v13"

export type SlashOptionType = string | number | boolean | MessageAttachment | undefined

const SlashOptionTypeTags = {
  string: "string",
  number: "number",
  boolean: "boolean",
  attachment: "attachment",
  undefined: "undefined",
} as const

export type SlashOptionTypeTag = (typeof SlashOptionTypeTags)[keyof typeof SlashOptionTypeTags]

function resolveTag(value: SlashOptionType): SlashOptionTypeTag | undefined {
  if (value === undefined) return undefined
  if (value instanceof MessageAttachment) return "attachment"
  return typeof value as SlashOptionTypeTag
}

export interface SlashOption {
  name: string
  type: SlashOptionTypeTag | undefined
  value: SlashOptionType
}

export class SlashOptionTypeError extends Error {
  constructor(name: string, expected: SlashOptionTypeTag, actual: SlashOptionTypeTag | undefined) {
    super(`Option "${name}": expected type "${expected}", got "${actual ?? "undefined"}".`)

    this.name = "SlashOptionTypeError"
  }
}

export class SlashOptionDuplicateError extends Error {
  constructor(name: string) {
    super(`Option "${name}" already exists in this manager.`)
    this.name = "SlashOptionDuplicateError"
  }
}

export class SlashOptionsManager {
  private readonly _map = new Map<string, SlashOption>()

  private _order: string[] = []

  get options(): SlashOption[] {
    return this.getByOrder()
  }

  get size(): number {
    return this._map.size
  }

  add(name: string, value: SlashOptionType): this {
    if (this._map.has(name)) {
      throw new SlashOptionDuplicateError(name)
    }

    this._map.set(name, {
      name,
      type: resolveTag(value),
      value,
    })

    this._order.push(name)

    return this
  }

  remove(name: string): boolean {
    const deleted = this._map.delete(name)

    if (deleted) {
      this._order = this._order.filter((n) => n !== name)
    }

    return deleted
  }

  get(name: string): SlashOption | undefined {
    return this._map.get(name)
  }

  getByType(type: SlashOptionTypeTag): SlashOption[] {
    return Array.from(this._map.values()).filter((o) => o.type === type)
  }

  pick(...names: string[]): SlashOptionType[] {
    return names.map((name) => this._map.get(name)?.value ?? undefined)
  }

  getByOrder(): SlashOption[] {
    return this._order.map(
      (name) =>
        this._map.get(name) ?? {
          name,
          type: "undefined",
          value: undefined,
        }
    )
  }

  setOrder(...names: string[]): this {
    const ordered = new Map<string, SlashOption>()

    for (const name of names) {
      const option = this._map.get(name)

      if (option) {
        ordered.set(name, option)
      } else {
        ordered.set(name, {
          name,
          type: "undefined",
          value: undefined,
        })
      }
    }

    this._map.clear()

    for (const [name, option] of ordered) {
      this._map.set(name, option)
    }

    this._order = [...ordered.keys()]

    return this
  }

  has(name: string): boolean {
    return this._map.has(name)
  }

  clear(): this {
    this._map.clear()
    this._order = []

    return this
  }
}

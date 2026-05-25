"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashOptionsManager = exports.SlashOptionDuplicateError = exports.SlashOptionTypeError = void 0;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
const SlashOptionTypeTags = {
    string: "string",
    number: "number",
    boolean: "boolean",
    attachment: "attachment",
    undefined: "undefined",
};
function resolveTag(value) {
    if (value === undefined)
        return undefined;
    if (value instanceof discord_js_selfbot_v13_1.MessageAttachment)
        return "attachment";
    return typeof value;
}
class SlashOptionTypeError extends Error {
    constructor(name, expected, actual) {
        super(`Option "${name}": expected type "${expected}", got "${actual ?? "undefined"}".`);
        this.name = "SlashOptionTypeError";
    }
}
exports.SlashOptionTypeError = SlashOptionTypeError;
class SlashOptionDuplicateError extends Error {
    constructor(name) {
        super(`Option "${name}" already exists in this manager.`);
        this.name = "SlashOptionDuplicateError";
    }
}
exports.SlashOptionDuplicateError = SlashOptionDuplicateError;
class SlashOptionsManager {
    _map = new Map();
    _order = [];
    get options() {
        return this.getByOrder();
    }
    get size() {
        return this._map.size;
    }
    add(name, value) {
        if (this._map.has(name)) {
            throw new SlashOptionDuplicateError(name);
        }
        this._map.set(name, {
            name,
            type: resolveTag(value),
            value,
        });
        this._order.push(name);
        return this;
    }
    remove(name) {
        const deleted = this._map.delete(name);
        if (deleted) {
            this._order = this._order.filter((n) => n !== name);
        }
        return deleted;
    }
    get(name) {
        return this._map.get(name);
    }
    getByType(type) {
        return Array.from(this._map.values()).filter((o) => o.type === type);
    }
    pick(...names) {
        return names.map((name) => this._map.get(name)?.value ?? undefined);
    }
    getByOrder() {
        return this._order.map((name) => this._map.get(name) ?? {
            name,
            type: "undefined",
            value: undefined,
        });
    }
    setOrder(...names) {
        const ordered = new Map();
        for (const name of names) {
            const option = this._map.get(name);
            if (option) {
                ordered.set(name, option);
            }
            else {
                ordered.set(name, {
                    name,
                    type: "undefined",
                    value: undefined,
                });
            }
        }
        this._map.clear();
        for (const [name, option] of ordered) {
            this._map.set(name, option);
        }
        this._order = [...ordered.keys()];
        return this;
    }
    has(name) {
        return this._map.has(name);
    }
    clear() {
        this._map.clear();
        this._order = [];
        return this;
    }
}
exports.SlashOptionsManager = SlashOptionsManager;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = void 0;
exports.isValidToken = isValidToken;
const discord_js_selfbot_v13_1 = require("discord.js-selfbot-v13");
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
];
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
];
function hashToken(token) {
    let h = 0x811c9dc5;
    for (let i = 0; i < token.length; i++) {
        h ^= token.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
        h = h >>> 0;
    }
    return h;
}
function generateName(token) {
    const h1 = hashToken(token);
    const h2 = hashToken(token.split("").reverse().join(""));
    const adj = ADJECTIVES[h1 % ADJECTIVES.length];
    const noun = NOUNS[h2 % NOUNS.length];
    return `${adj}-${noun}`;
}
async function isValidToken(token) {
    const raw = typeof token === "string" ? token : token.token;
    try {
        const res = await fetch("https://discord.com/api/v9/users/@me", {
            headers: { Authorization: raw },
        });
        return res.ok;
    }
    catch {
        return false;
    }
}
class TokenManager {
    _map = new discord_js_selfbot_v13_1.Collection();
    resolve(idOrToken) {
        if (this._map.has(idOrToken))
            return idOrToken;
        return this._map.findKey((e) => e.token === idOrToken || e.name === idOrToken);
    }
    add(token, id) {
        const name = generateName(token);
        const key = id ?? name;
        this._map.set(key, { token, id: key, name, valid: undefined, addedAt: Date.now() });
        return this;
    }
    addMany(tokens) {
        for (const entry of tokens) {
            Array.isArray(entry) ? this.add(entry[1], entry[0]) : this.add(entry);
        }
        return this;
    }
    get(idOrToken) {
        return this._map.get(this.resolve(idOrToken) ?? "");
    }
    has(idOrToken) {
        return !!this.resolve(idOrToken);
    }
    remove(idOrToken) {
        const key = this.resolve(idOrToken);
        return key ? this._map.delete(key) : false;
    }
    setValidity(idOrToken, valid) {
        const key = this.resolve(idOrToken);
        if (!key)
            return false;
        this._map.get(key).valid = valid;
        return true;
    }
    async validate(idOrToken) {
        const entry = this.get(idOrToken);
        if (!entry)
            return false;
        const valid = await isValidToken(entry);
        this.setValidity(entry.token, valid);
        return valid;
    }
    async validateAll() {
        const results = new Map();
        await Promise.all([...this._map.values()].map(async (entry) => {
            const valid = await isValidToken(entry);
            this.setValidity(entry.token, valid);
            results.set(entry.name, valid);
        }));
        return results;
    }
    all(filter) {
        const values = [...this._map.values()];
        return filter === undefined ? values : values.filter((e) => e.valid === filter);
    }
    tokens(filter) {
        return this.all(filter).map((e) => e.token);
    }
    clear(filter) {
        if (filter === undefined) {
            this._map.clear();
            return this;
        }
        for (const [key, entry] of this._map) {
            if (entry.valid === filter)
                this._map.delete(key);
        }
        return this;
    }
    get size() {
        return this._map.size;
    }
}
exports.TokenManager = TokenManager;

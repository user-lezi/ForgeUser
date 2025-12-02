"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REST = void 0;
class REST {
    token;
    version;
    cacheTTL;
    cache;
    constructor(options) {
        this.token = options.token;
        this.version = options.version ?? 10;
        this.cacheTTL = options.cacheTTL ?? 5 * 60 * 1000;
        this.cache = new Map();
    }
    get base() {
        return `https://discord.com/api/v${this.version}`;
    }
    get headers() {
        return {
            Authorization: this.token,
            "Content-Type": "application/json",
        };
    }
    fromCache(url) {
        const entry = this.cache.get(url);
        if (!entry)
            return null;
        if (Date.now() > entry.expires) {
            this.cache.delete(url);
            return null;
        }
        return entry.data;
    }
    saveCache(url, data) {
        this.cache.set(url, {
            expires: Date.now() + this.cacheTTL,
            data,
        });
    }
    async request(method, route, options = {}) {
        const url = `${this.base}${route}`;
        if (method === "GET" && !options.force) {
            const cached = this.fromCache(url);
            if (cached !== null)
                return cached;
        }
        const res = await fetch(url, {
            method,
            headers: this.headers,
            ...options,
        });
        return this.handleResponse(method, route, res);
    }
    async handleResponse(method, route, res) {
        const status = res.status;
        let data;
        try {
            data = await res.json();
        }
        catch {
            data = null;
        }
        if (status === 429) {
            const retrySec = data?.retry_after ?? 1;
            if (retrySec > 10) {
                throw new Error(`Rate limited for too long (${retrySec}s). Route: ${route}`);
            }
            await new Promise((r) => setTimeout(r, retrySec * 1000));
            return this.request(method, route);
        }
        if (!res.ok) {
            throw new Error(`REST Error ${status} for ${this.base}${route}:\n${JSON.stringify(data, null, 2)}`);
        }
        if (method === "GET") {
            this.saveCache(`${this.base}${route}`, data);
        }
        return data;
    }
    get(route, options) {
        return this.request("GET", route, options);
    }
    post(route, body, options) {
        return this.request("POST", route, {
            ...options,
            body: body ? JSON.stringify(body) : undefined,
        });
    }
    patch(route, body, options) {
        return this.request("PATCH", route, {
            ...options,
            body: body ? JSON.stringify(body) : undefined,
        });
    }
    put(route, body, options) {
        return this.request("PUT", route, {
            ...options,
            body: body ? JSON.stringify(body) : undefined,
        });
    }
    delete(route, options) {
        return this.request("DELETE", route, options);
    }
}
exports.REST = REST;

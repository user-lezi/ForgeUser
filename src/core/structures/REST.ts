export interface RESTOptions {
  token: string;
  version?: number;
  cacheTTL?: number; // ms to cache responses
}

interface CacheEntry {
  expires: number;
  data: any;
}

export interface RESTRequestOptions extends RequestInit {
  force?: boolean; // bypass cache
}

export class REST {
  private token: string;
  private version: number;
  private cacheTTL: number;
  private cache: Map<string, CacheEntry>;

  constructor(options: RESTOptions) {
    this.token = options.token;
    this.version = options.version ?? 10;
    this.cacheTTL = options.cacheTTL ?? 5 * 60 * 1000; // default 5 minutes
    this.cache = new Map();
  }

  /** Base Discord API URL */
  private get base() {
    return `https://discord.com/api/v${this.version}`;
  }

  /** Authorization headers */
  private get headers() {
    return {
      Authorization: this.token,
      "Content-Type": "application/json",
    };
  }

  /** Retrieve cached value if valid */
  private fromCache<T>(url: string): T | null {
    const entry = this.cache.get(url);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
      this.cache.delete(url);
      return null;
    }

    return entry.data as T;
  }

  /** Save to cache */
  private saveCache(url: string, data: any) {
    this.cache.set(url, {
      expires: Date.now() + this.cacheTTL,
      data,
    });
  }

  /** Internal request handler */
  private async request<T>(
    method: string,
    route: string,
    options: RESTRequestOptions = {},
  ): Promise<T> {
    const url = `${this.base}${route}`;

    // GET caching logic
    if (method === "GET" && !options.force) {
      const cached = this.fromCache<T>(url);
      if (cached !== null) return cached;
    }

    const res = await fetch(url, {
      method,
      headers: this.headers,
      ...options,
    });

    return this.handleResponse<T>(method, route, res);
  }

  /** Handle Discord API responses */
  private async handleResponse<T>(
    method: string,
    route: string,
    res: Response,
  ): Promise<T> {
    const status = res.status;
    let data: any;

    try {
      data = await res.json();
    } catch {
      data = null;
    }

    // RATE LIMIT HANDLING
    if (status === 429) {
      const retrySec = data?.retry_after ?? 1;

      // If retry time too high → prevent forever waiting
      if (retrySec > 10) {
        throw new Error(
          `Rate limited for too long (${retrySec}s). Route: ${route}`,
        );
      }

      await new Promise((r) => setTimeout(r, retrySec * 1000));
      return this.request<T>(method, route); // retry properly
    }

    // Other errors
    if (!res.ok) {
      throw new Error(
        `REST Error ${status} for ${this.base}${route}:\n${JSON.stringify(
          data,
          null,
          2,
        )}`,
      );
    }

    // Cache GET results
    if (method === "GET") {
      this.saveCache(`${this.base}${route}`, data);
    }

    return data as T;
  }

  // ---- PUBLIC METHODS ---- //

  get<T = any>(route: string, options?: RESTRequestOptions) {
    return this.request<T>("GET", route, options);
  }

  post<T = any>(route: string, body?: any, options?: RESTRequestOptions) {
    return this.request<T>("POST", route, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T = any>(route: string, body?: any, options?: RESTRequestOptions) {
    return this.request<T>("PATCH", route, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T = any>(route: string, body?: any, options?: RESTRequestOptions) {
    return this.request<T>("PUT", route, {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T = any>(route: string, options?: RESTRequestOptions) {
    return this.request<T>("DELETE", route, options);
  }
}

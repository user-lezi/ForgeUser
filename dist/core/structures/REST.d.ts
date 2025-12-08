export interface RESTOptions {
    token: string;
    version?: number;
    cacheTTL?: number;
}
export interface RESTRequestOptions extends RequestInit {
    force?: boolean;
}
export declare class REST {
    private token;
    private version;
    private cacheTTL;
    private cache;
    constructor(options: RESTOptions);
    private get base();
    private get headers();
    private fromCache;
    private saveCache;
    private request;
    private handleResponse;
    get<T = any>(route: string, options?: RESTRequestOptions): Promise<T>;
    post<T = any>(route: string, body?: any, options?: RESTRequestOptions): Promise<T>;
    patch<T = any>(route: string, body?: any, options?: RESTRequestOptions): Promise<T>;
    put<T = any>(route: string, body?: any, options?: RESTRequestOptions): Promise<T>;
    delete<T = any>(route: string, options?: RESTRequestOptions): Promise<T>;
}

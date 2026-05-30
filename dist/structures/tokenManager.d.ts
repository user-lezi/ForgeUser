export interface IToken {
    token: string;
    id: string;
    name: string;
    valid?: boolean;
    addedAt: number;
}
export declare function isValidToken(token: string | IToken): Promise<boolean>;
export declare class TokenManager {
    private readonly _map;
    private resolve;
    add(token: string, id?: string): this;
    addMany(tokens: string[] | [string, string][]): this;
    get(idOrToken: string): IToken | undefined;
    has(idOrToken: string): boolean;
    remove(idOrToken: string): boolean;
    setValidity(idOrToken: string, valid: boolean): boolean;
    validate(idOrToken: string): Promise<boolean>;
    validateAll(): Promise<Map<string, boolean>>;
    all(filter?: boolean): IToken[];
    tokens(filter?: boolean): string[];
    clear(filter?: boolean): this;
    get size(): number;
}

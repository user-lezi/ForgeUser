import { MessageAttachment } from "discord.js-selfbot-v13";
export type SlashOptionType = string | number | boolean | MessageAttachment | undefined;
declare const SlashOptionTypeTags: {
    readonly string: "string";
    readonly number: "number";
    readonly boolean: "boolean";
    readonly attachment: "attachment";
    readonly undefined: "undefined";
};
export type SlashOptionTypeTag = (typeof SlashOptionTypeTags)[keyof typeof SlashOptionTypeTags];
export interface SlashOption {
    name: string;
    type: SlashOptionTypeTag | undefined;
    value: SlashOptionType;
}
export declare class SlashOptionTypeError extends Error {
    constructor(name: string, expected: SlashOptionTypeTag, actual: SlashOptionTypeTag | undefined);
}
export declare class SlashOptionDuplicateError extends Error {
    constructor(name: string);
}
export declare class SlashOptionsManager {
    private readonly _map;
    private _order;
    get options(): SlashOption[];
    get size(): number;
    add(name: string, value: SlashOptionType): this;
    remove(name: string): boolean;
    get(name: string): SlashOption | undefined;
    getByType(type: SlashOptionTypeTag): SlashOption[];
    pick(...names: string[]): SlashOptionType[];
    getByOrder(): SlashOption[];
    setOrder(...names: string[]): this;
    has(name: string): boolean;
    clear(): this;
}
export {};

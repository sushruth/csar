import { CreateStateOptions } from "../lib/create-state.types";
export declare type CreateStateOptionsWithDevtools<State, Actions> = CreateStateOptions<State, Actions> & {
    /** **For devtools only** - used as the name for reducer instance */
    name?: string;
    /** **For devtools only** - replacer function for JSON.stringify */
    replacer?: (this: any, key: string, value: any) => any;
    /** **For devtools only** - reviver function for JSON.parse */
    reviver?: (this: any, key: string, value: any) => any;
};

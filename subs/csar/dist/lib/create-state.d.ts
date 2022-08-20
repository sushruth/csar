import type { StateCreator } from 'zustand';
import { ActionProto, AsyncReducer, AsyncDispatch } from '..';
/**
 * This function largely follows the zustand redux middleware format
 * https://github.com/pmndrs/zustand/blob/main/src/middleware/redux.ts
 */
export declare function asyncRedux<S extends object, A extends ActionProto>(reducer: AsyncReducer<S, A>, initial: S): StateCreator<{
    dispatch: AsyncDispatch<A>;
} & S, [], [], {
    dispatch: AsyncDispatch<A>;
} & S>;
export declare function createAsyncState<S extends object, A extends ActionProto>(reducer: AsyncReducer<S, A>, initial: S): readonly [AsyncDispatch<A>, import("zustand").UseBoundStore<import("zustand").StoreApi<{
    dispatch: AsyncDispatch<A>;
} & S>>];

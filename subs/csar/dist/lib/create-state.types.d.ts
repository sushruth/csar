import { DeepReadonly } from './deep-readonly.types';
export declare type ActionProto = {
    type: string;
};
export declare type AsyncDispatch<A extends ActionProto> = (action: A) => Promise<void>;
export declare type AsyncReducer<S extends object, A extends ActionProto> = (action: A, getState: () => DeepReadonly<S>, dispatch: AsyncDispatch<A>) => Promise<S> | S;

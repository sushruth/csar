export type DeepReadonly<T> = T extends Function | Primitive
  ? T
  : T extends ReadonlyArray<infer R>
  ? DeepReadonlyArray<R>
  : T extends ReadonlyMap<infer K, infer V>
  ? DeepReadonlyMap<K, V>
  : T extends ReadonlySet<infer ItemType>
  ? ReadonlySetDeep<ItemType>
  : T extends object
  ? DeepReadonlyObject<T>
  : T;

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface DeepReadonlyMap<K, V>
  extends ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>> {}

interface ReadonlySetDeep<ItemType>
  extends ReadonlySet<DeepReadonly<ItemType>> {}

export type StateReducer<State, Actions> = (
  action: Actions,
  getState: () => DeepReadonly<State>,
  dispatch: (action: Actions) => Promise<void>
) => State | DeepReadonly<State> | Promise<State> | Promise<DeepReadonly<State>>
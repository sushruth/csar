import { DeepReadonly } from './deep-readonly.types'

export type ActionProto = { type: string }
export type AsyncDispatch<A extends ActionProto> = (action: A) => Promise<void>
export type AsyncReducer<S extends object, A extends ActionProto> = (
  action: A,
  getState: () => DeepReadonly<S>,
  dispatch: AsyncDispatch<A>
) => Promise<S> | S

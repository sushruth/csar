import type { StateCreator } from 'zustand'
import create from 'zustand'
import { ActionProto, AsyncReducer, AsyncDispatch } from '..'
import { DeepReadonly } from './deep-readonly.types'

/**
 * This function largely follows the zustand redux middleware format
 * https://github.com/pmndrs/zustand/blob/main/src/middleware/redux.ts
 */
export function asyncRedux<S extends object, A extends ActionProto>(
  reducer: AsyncReducer<S, A>,
  initial: S
) {
  type State = {
    dispatch: AsyncDispatch<A>
  } & S

  const adapter: StateCreator<State> = (set, get) => {
    async function dispatch(action: A) {
      set(await reducer(action, get as () => DeepReadonly<S>, dispatch))
    }

    return { dispatch, ...initial }
  }

  return adapter
}

export function createAsyncState<S extends object, A extends ActionProto>(
  reducer: AsyncReducer<S, A>,
  initial: S
) {
  const stateHook = create(asyncRedux(reducer, initial))
  return [stateHook.getState().dispatch, stateHook] as const
}

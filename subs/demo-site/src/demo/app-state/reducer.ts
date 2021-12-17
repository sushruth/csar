import { Actions, State } from './types'
import { produce } from 'immer'
import { StateReducer } from 'csar'
import { init } from './init'

export const reducer: StateReducer<State, Actions> = async (
  action,
  getState,
  _dispatch
) => {
  switch (action.type) {
    case 'mark':
      return produce(getState(), (draft) => {
        draft.values[action.payload.x][action.payload.y] = true
      })

    case 'clear':
      return init
  }
}

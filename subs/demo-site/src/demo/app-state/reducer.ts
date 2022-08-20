import { Actions, State } from './types'
import { produce } from 'immer'
import { init } from './init'
import { AsyncReducer } from 'csar'

export const reducer: AsyncReducer<State, Actions> = async (
  action,
  getState,
  _dispatch
) => {
  switch (action.type) {
    case 'mark':
      return produce(getState() as State, (draft) => {
        draft.values[action.payload.x][action.payload.y] = true
      })

    case 'clear':
      return init
  }
}

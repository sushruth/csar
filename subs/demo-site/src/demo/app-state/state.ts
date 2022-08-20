import { createAsyncState } from 'csar'
import { init } from './init'
import { reducer } from './reducer'

export const [dispatch, useStateSelector] = createAsyncState(reducer, init)

import { init } from './init'
import { reducer } from './reducer'
import { createState, CreateStateOptions } from 'csar'
import equal from 'fast-deep-equal'
import { Actions, State } from './types'

let options: CreateStateOptions<State, Actions> = {
  init,
  reducer,
  notEqual: (a, b) => !equal(a, b),
}

if (process.env.NODE_ENV === 'development') {
  const { addDevtools } = require('csar')
  options = addDevtools({ init, reducer, name: 'My app state' })
}

export const [dispatch, useStateSelector] = createState(options)

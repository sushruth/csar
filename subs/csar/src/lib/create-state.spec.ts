import { renderHook } from '@testing-library/react'
import { AsyncReducer } from '..'
import { createAsyncState } from './create-state'

describe('create-state', () => {
  type State = {
    foo: string
  }

  type Actions = {
    type: 'setFoo'
    payload: {
      value: string
    }
  }

  const init: State = {
    foo: 'bar',
  }

  const reducer: AsyncReducer<State, Actions> = (
    action,
    getState,
    dispatch
  ) => {
    switch (action.type) {
      case 'setFoo': {
        const { value } = action.payload

        return {
          ...getState(),
          foo: value,
        }
      }
    }
  }

  it('should create state successfully', () => {
    const [, useAsyncState] = createAsyncState(reducer, init)

    const result = useAsyncState.getState()

    expect(result.foo).toEqual(init.foo)
  })

  it('should create state hook successfully', () => {
    const [, useAsyncState] = createAsyncState(reducer, init)
    const { result } = renderHook(() => useAsyncState((state) => state.foo))

    expect(result.current).toEqual(init.foo)
  })

  it('should dispatch successfully', async () => {
    const [dispatch, useAsyncState] = createAsyncState(reducer, init)
    const value = 'another'

    await dispatch({
      type: 'setFoo',
      payload: {
        value,
      },
    })

    const { result } = renderHook(() => useAsyncState((state) => state.foo))

    expect(result.current).toEqual(value)
  })
})

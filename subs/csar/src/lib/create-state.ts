import { CreateStateOptions, DeepReadonly } from './create-state.types'
import { notEqualDefault } from './defaults'
import { getReactRenderer } from './react/react'

export function createState<State, Actions>({
  init,
  reducer,
  notEqual = notEqualDefault,
}: CreateStateOptions<State, Actions>) {
  const handlerMap = new Map<Function, Function>()
  const lastResultMap = new Map<Function, unknown>()

  const stateHolder = {
    _state: init,
    get state() {
      return this._state
    },
    set state(newState: State) {
      this._state = newState

      for (const [fn, handler] of handlerMap.entries()) {
        // Figure out a way to run handlers for ONLY the changed property
        if (!handler) continue

        const lastResult = lastResultMap.get(fn)
        const newResult = fn(this._state)

        if (notEqual(newResult, lastResult)) {
          lastResultMap.set(fn, newResult)
          handler()
        }
      }
    },
  }

  function getState() {
    return stateHolder.state as DeepReadonly<State>
  }

  async function dispatch(action: Actions) {
    const result = await reducer(action, getState, dispatch)
    stateHolder.state = result as State
  }

  function unregister(selector: Function) {
    handlerMap.delete(selector)
    lastResultMap.delete(selector)
  }

  function registerOnce<SelectedValue>(
    selector: (state: State) => SelectedValue,
    handler: Function
  ) {
    const value = selector(stateHolder.state) as SelectedValue

    if (!handlerMap.has(selector)) {
      handlerMap.set(selector, handler)
      lastResultMap.set(selector, value)
    }

    return value
  }

  /**
   * Returns a function that returns the result of a selector
   * @param selector Selector function that takes in state and returns a part of it
   * @param getRenderer a function that takes in the selector function and returns a function that can be used to force update the component
   * @returns the selected part of the state
   */
  function useStateSelector<
    SelectedValue,
    Selector extends (state: State) => SelectedValue
  >(selector: Selector, getRenderer = getReactRenderer) {
    const renderer = getRenderer(selector, unregister)
    return registerOnce(selector, renderer)
  }

  return [dispatch, useStateSelector, getState] as const
}

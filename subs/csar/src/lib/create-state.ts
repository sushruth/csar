import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { CreateStateOptions, DeepReadonly } from "./create-state.types";

const forceUpdate = (state: number) => state + 1;
const notEqualDefault = (a: unknown, b: unknown) => a !== b;

export function createState<State, Actions>({
  init,
  reducer,
  notEqual = notEqualDefault,
}: CreateStateOptions<State, Actions>) {
  const handlerMap = new Map<Function, Function>();
  const lastResultMap = new Map<Function, unknown>();

  const stateHolder = {
    _state: init,
    get state() {
      return this._state;
    },
    set state(newState: State) {
      this._state = newState;

      for (const [fn, handler] of handlerMap.entries()) {
        // Figure out a way to run handlers for ONLY the changed property
        if (!handler) continue;

        const lastResult = lastResultMap.get(fn);
        const newResult = fn(this._state);

        if (notEqual(newResult, lastResult)) {
          lastResultMap.set(fn, newResult);
          handler();
        }
      }
    },
  };

  function getState() {
    return stateHolder.state as DeepReadonly<State>;
  }

  async function dispatch(action: Actions) {
    const result = await reducer(action, getState, dispatch);
    stateHolder.state = result as State;
  }

  function unregister(fn: Function) {
    handlerMap.delete(fn);
    lastResultMap.delete(fn);
  }

  function useStateSelector<SelectedValue>(
    fn: (state: State) => SelectedValue
  ) {
    const fnRef = useRef(fn);
    const value = fnRef.current(stateHolder.state) as SelectedValue;

    // re-render mechanism
    // somehow useState seems to be less blocking than useReducer
    const [, setState] = useState(0);
    const rerender = useCallback(() => setState(forceUpdate), []);

    // To unregister the handler when component unmounts
    useEffect(() => () => unregister(fnRef.current), []);

    if (!handlerMap.has(fnRef.current)) {
      handlerMap.set(fnRef.current, rerender);
      lastResultMap.set(fnRef.current, value);
    }

    return value;
  }

  return [dispatch, useStateSelector, getState] as const;
}

export default createState;

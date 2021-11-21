import { useEffect, useReducer, useRef } from "react";
import {
  CreateStateOptions,
  DeepReadonly,
  StateReducer,
} from "./create-state.types";

const forceReducer = (state: number) => state + 1;

export function createState<State, Actions>({
  init,
  reducer,
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

      for (const fn of handlerMap.keys()) {
        // Figure out a way to run handlers for ONLY the changed property
        const handler = handlerMap.get(fn);
        const lastResult = lastResultMap.get(fn);
        const newResult = fn(this._state);
        if (handler && newResult != lastResult) {
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
    const [, rerender] = useReducer(forceReducer, 0);
    const value = fnRef.current(stateHolder.state);

    if (!handlerMap.has(fnRef.current)) {
      handlerMap.set(fnRef.current, rerender);
    }

    if (!lastResultMap.has(fnRef.current)) {
      lastResultMap.set(fnRef.current, value);
    }

    // To unregister the handler when component unmounts
    useEffect(() => unregister(fnRef.current), []);

    return value as SelectedValue;
  }

  return [dispatch, useStateSelector, getState] as const;
}

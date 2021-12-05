import { useEffect, useReducer, useRef } from "react";
import { CreateStateOptions, DeepReadonly } from "./create-state.types";

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

      for (const [fn, handler] of handlerMap.entries()) {
        // Figure out a way to run handlers for ONLY the changed property
        if (!handler) continue;

        const lastResult = lastResultMap.get(fn);
        const newResult = fn(this._state);

        if (newResult != lastResult) {
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
    handlerMap.set(fnRef.current, rerender);

    // To unregister the handler when component unmounts
    useEffect(() => () => unregister(fnRef.current), []);

    return value as SelectedValue;
  }

  return [dispatch, useStateSelector, getState] as const;
}

export default createState;

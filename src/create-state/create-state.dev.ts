import { useReducer, useRef } from "react";
import { DeepReadonly, StateReducer } from "./create-state.types";

const forceReducer = (state: number) => state + 1;

type StateConfig = {
  /** **For devtools only** - used as the name for reducer instance */
  name?: string;
  /** **For devtools only** - replacer function for JSON.stringify */
  replacer?: (this: any, key: string, value: any) => any;
  /** **For devtools only** - reviver function for JSON.parse */
  reviver?: (this: any, key: string, value: any) => any;
};

let devtools: any;

if (process.env.NODE_ENV === "development") {
  devtools = (() => {
    try {
      return (
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ ||
        (window.top as any).__REDUX_DEVTOOLS_EXTENSION__ ||
        (window.parent as any).__REDUX_DEVTOOLS_EXTENSION__
      );
    } catch (error) {
      console.warn("Could not find Redux Devtools extension");
      return undefined;
    }
  })();
}

let instanceId = 0;

export function createState<State, Actions>(
  init: State,
  reducer: StateReducer<State, Actions>,
  config?: StateConfig
) {
  const handlerMap = new Map<Function, Function>();
  const lastResultMap = new Map<Function, unknown>();

  if (process.env.NODE_ENV === "development") {
    (window as any).handlerMap = handlerMap;
    (window as any).lastResultMap = lastResultMap;
    if (devtools) {
      devtools.connect({
        name: config?.name || `ProxyState ${instanceId++}`,
        serialize: {
          replacer: config?.replacer,
          reviver: config?.reviver,
        },
        features: {
          persist: false, // persist states on page reloading
          export: true, // export history of actions in a file
          import: "custom", // import history of actions from a file
          jump: false, // jump back and forth (time travelling)
          skip: false, // skip (cancel) actions
          reorder: false, // drag and drop actions in the history list
          dispatch: true, // dispatch custom actions or action creators
          test: true, // generate tests for the selected actions
        },
      });
      devtools.send("INIT", init);
    }
  }

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
    if (process.env.NODE_ENV === "development") {
      devtools?.send(action, result);
    }
    stateHolder.state = result as State;
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

    return value as SelectedValue;
  }

  return [dispatch, useStateSelector, getState] as const;
}

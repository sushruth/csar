import { CreateStateOptionsWithDevtools } from "./add-devtools.types";
import { CreateStateOptions, StateReducer } from "../lib/create-state.types";

const devtoolsName = "__REDUX_DEVTOOLS_EXTENSION__";

let devtools = (() => {
  try {
    return (window as any)[devtoolsName] || (window.top as any)[devtoolsName];
  } catch (error) {
    return undefined;
  }
})();

let instanceId = 0;

export function addDevtools<State, Actions>({
  init,
  reducer,
  name,
  replacer,
  reviver,
}: CreateStateOptionsWithDevtools<State, Actions>): CreateStateOptions<
  State,
  Actions
> {
  if (devtools) {

    devtools.connect({
      name: name || `ProxyState ${instanceId++}`,
      serialize: {
        replacer,
        reviver,
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

    devtools.send("__INIT__", init);

    const wrappedReducer: StateReducer<State, Actions> = async (
      action,
      getState,
      dispatch
    ) => {
      const __startTime = new Date().toISOString();

      const result = reducer(action, getState, dispatch);
      const output = await result;

      if (result instanceof Promise) {
        devtools.send(
          {
            ...action,
            __startTime,
            __endTime: new Date().toISOString(),
          },
          output
        );
      } else {
        devtools.send(action, result);
      }

      return result as State;
    };

    return {
      reducer: wrappedReducer,
      init,
    };
  } else {
    return { reducer, init }
  }
}

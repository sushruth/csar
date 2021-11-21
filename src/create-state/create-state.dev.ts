import { CreateStateOptionsWithDevtools } from "./create-state.dev.types";
import { CreateStateOptions, StateReducer } from "./create-state.types";

let devtools = (() => {
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
  devtools?.connect({
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
  devtools?.send("INIT", init);

  const wrappedReducer: StateReducer<State, Actions> = async (
    action,
    getState,
    dispatch
  ) => {
    Object.assign(action, {
      startTime: new Date().toISOString(),
    });

    const result = await reducer(action, getState, dispatch);

    Object.assign(action, {
      endTime: new Date().toISOString(),
    });
    devtools?.send(action, result);
    return result as State;
  };

  return {
    reducer: wrappedReducer,
    init,
  };
}

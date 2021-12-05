import { renderHook } from "@testing-library/react-hooks";
import { StateReducer } from "./create-state.types";
import { createState } from "./create-state";

describe("create-state", () => {
  type State = {
    foo: string;
  };

  type Actions = {
    type: "setFoo";
    payload: {
      value: string;
    };
  };

  const init: State = {
    foo: "bar",
  };

  const reducer: StateReducer<State, Actions> = (
    action,
    getState,
    dispatch
  ) => {
    switch (action.type) {
      case "setFoo": {
        const { value } = action.payload;

        return {
          ...getState(),
          foo: value,
        };
      }
    }
  };

  it("should create state", () => {
    const [, , getState] = createState({ init, reducer });

    expect(getState()).toEqual(init);
  });

  it("should render hook successfully", () => {
    const [, useSelector] = createState({ init, reducer });

    const { result } = renderHook(() => useSelector((state) => state.foo));

    expect(result.current).toEqual(init.foo);
  });
});

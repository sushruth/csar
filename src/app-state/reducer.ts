import { StateReducer } from "../create-state/create-state.types";
import { Actions, State } from "./types";
import { produce } from "immer";

export const reducer: StateReducer<State, Actions> = async (
  action,
  getState,
  _dispatch
) => {
  if (action.type === "change") {
    const prevState = getState();
    const { i, j } = action.payload;

    return {
      ...getState(),
      selected: produce(prevState.selected, (draft) => {
        draft[i][j] = true;
      }),
      selectedIndices: {
        i,
        j,
      },
    };
  }

  return getState();
};

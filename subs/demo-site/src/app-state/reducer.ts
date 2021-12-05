import { Actions, State } from "./types";
import { produce } from "immer";
import { StateReducer } from "csar";

export const reducer: StateReducer<State, Actions> = async (
  action,
  getState,
  _dispatch
) => {
  if (action.type === "change") {
    const { i, j } = action.payload;

    return produce(getState(), (draft) => {
      const selectedIndices = draft.selectedIndices;
      draft.selected[selectedIndices.i][selectedIndices.j] = false;
      draft.selected[i][j] = true;
      draft.selectedIndices = { i, j };
    });
  }

  return getState();
};

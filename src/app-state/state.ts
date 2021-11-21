import { createState } from "../create-state/create-state";
import { addDevtools } from "../create-state/create-state.dev";
import { init } from "./init";
import { reducer } from "./reducer";

export const [dispatch, useStateSelector] = createState(
  addDevtools({ init, reducer })
);

import { createState } from "../create-state/create-state";
import { init } from "./init";
import { reducer } from "./reducer";

export const [dispatch, useStateSelector] = createState(init, reducer)
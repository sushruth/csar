import { init } from "./init";
import { reducer } from "./reducer";
import {createState} from 'sanchi'
import {addDevtools} from 'sanchi/dev'

export const [dispatch, useStateSelector] = createState(
  addDevtools({ init, reducer })
);

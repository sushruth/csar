import { init } from "./init";
import { reducer } from "./reducer";
import {createState} from 'csar'

let options = { init, reducer };

if (process.env.NODE_ENV === "development") {
  const {addDevtools} = require("csar");
  options = addDevtools({ init, reducer, name: "My app state" })
}

export const [dispatch, useStateSelector] = createState(options);

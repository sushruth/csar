import React from "react";
import { hydrate, render } from "react-dom";
import App from "./App";

import 'normalize.css/normalize.css'

// somehow this file isn't right.
//@ts-expect-error
import * as some from '@codesandbox/sandpack-react/dist/index.css';

some;

const rootElement = document.getElementById("app");
if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
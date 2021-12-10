import React from "react";
import { hydrate, render } from "react-dom";
import App from "./App";

import 'normalize.css/normalize.css'
// Import PrismJS extensions
import './prism-theme.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const rootElement = document.getElementById("app");
if (rootElement?.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}
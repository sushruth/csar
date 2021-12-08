import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Import PrismJS extensions
import './prism-theme.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);

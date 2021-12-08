import * as React from "react";
import { useCallback, useEffect } from "react";
import { init } from "./app-state/init";
import { useStateSelector, dispatch } from "./app-state/state";
import "./styles.css";

export default function App() {
  return (
    <div className="container">
      <div className="fixed-width flex col center">
        <h1>
          <code className="shrink">csar</code>
        </h1>
        <span className="subtitle">Context-less state with async reducers</span>
        <div className="flex spaced center">
          <a className="flex center" href="https://www.npmjs.com/package/csar">
            <img src="https://img.shields.io/npm/v/csar?style=flat-square" alt="npm" />
          </a>
          <img src="https://img.shields.io/bundlephobia/minzip/csar?style=flat-square" alt="" />
        </div>
        <div className="flex card">

        </div>
      </div>
    </div>
  );
}

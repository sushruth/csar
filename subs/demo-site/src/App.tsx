import Prism from 'prismjs'
import React, { useLayoutEffect } from 'react'

import './styles.css'
import './theme.css'

export default function App() {
  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <div className="container line-numbers">
      <div className="fixed-width flex col center">
        <h1>
          <code className="title shrink">csar</code>
        </h1>
        <span className="subtitle">Context-less state with async reducers</span>
        <div className="flex spaced center">
          <a className="flex center" href="https://www.npmjs.com/package/csar">
            <img
              src="https://img.shields.io/npm/v/csar?style=flat-square"
              alt="npm"
            />
          </a>
          <a
            className="flex center"
            href="https://bundlephobia.com/package/csar@0.1.0"
          >
            <img
              src="https://img.shields.io/bundlephobia/minzip/csar?style=flat-square"
              alt=""
            />
          </a>
          <a
            className="flex center"
            href="https://npm-stat.com/charts.html?package=csar&from=2021-12-04"
          >
            <img
              src="https://img.shields.io/npm/dm/csar?style=flat-square"
              alt=""
            />
          </a>
        </div>
        <div className="flex center col">
          <div className="card flex full col">
            <span className="header">What is this?</span>
            <div>
              <code className="language-tsx">csar</code> is a library that
              allows you to create a state and manage it with a reducer. It's
              pretty much like redux, except that
              <ul>
                <li>
                  There is <b>no global react context</b> necessary
                </li>
                <li>
                  You can use <b>async function as reducers</b>
                </li>
                <li>
                  You can{' '}
                  <code className="language-typescript">dispatch()</code>
                  <b> inside reducer</b>
                </li>
                <li>
                  Comes with a{' '}
                  <code className="language-typescript">useSelector</code> hook
                  out of the box
                </li>
              </ul>
            </div>
          </div>
          <div className="card flex full col">
            <span className="header">What's the use?</span>
            <p>The result of the features above is that</p>
            <ul>
              <li>
                <code className="language-typescript">useSelector</code> - When
                using a react context, re-renders still happen but may not
                produce a diff. With{' '}
                <code className="language-typescript">csar</code> it
                force-renders only components which need to re-render thereby
                providing better performance.
              </li>
              <li>
                <b>Async reducers</b> - Network calls can be made in reducers,
                all business logic can live in one place. No need for multiple
                plugins to achieve async state updates outside of a component.
              </li>
            </ul>
          </div>
          <div className="card flex full col">
            <span className="header">Usage and demo</span>
            <div className="flex center full">
              <iframe
                src="https://codesandbox.io/embed/determined-feistel-u0umw?autoresize=1&codemirror=1&fontsize=13&hidenavigation=1&module=%2Fsrc%2Fdrawing-surface%2Fsingle.tsx&theme=dark"
                style={{
                  width: '100%',
                  height: '500px',
                  border: 0,
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
                title="csar-demo"
                allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

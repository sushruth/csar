import { Sandpack } from '@codesandbox/sandpack-react'
import React from 'react'
import './styles.css'
import './theme.css'

declare const demoContent: Record<string, string>

export default function App() {
  return (
    <div className="container line-numbers">
      <div className="fixed-width flex col center">
        <h1>
          <code className="title shrink">csar</code>
        </h1>
        <span className="subtitle">Context-less state with async reducers</span>
        <div className="flex spaced center wrap">
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
            <span className="header">Usage and demo</span>
            <div className="flex stretch full wrap">
              <Sandpack
                template="react-ts"
                files={demoContent}
                customSetup={{
                  dependencies: {
                    csar: 'latest',
                    immer: '9.0.7',
                    'fast-deep-equal': '^3.1.3',
                  },
                }}
                options={{
                  openPaths: [
                    '/src/drawing-surface/drawing-surface.tsx',
                    '/src/drawing-surface/single.tsx',
                    '/src/app-state/state.ts',
                    '/src/app-state/reducer.ts',
                  ],
                  editorHeight: '500px',
                  editorWidthPercentage: 70,
                  activePath: '/src/app-state/state.ts',
                  showLineNumbers: true,
                }}
              />
            </div>
          </div>
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
        </div>
      </div>
    </div>
  )
}

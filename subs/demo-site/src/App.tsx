import { Sandpack } from '@codesandbox/sandpack-react'
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
        <span className="subtitle">
          A
          <a target="_blank" href="https://github.com/pmndrs/zustand">
            <code>zustand</code>
          </a>
          middleware for async reducers
        </span>
        <span>
          <code className="language-tsx">csar</code> stands for "Context-less
          state with async reducers"
        </span>
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
                theme="auto"
                template="react-ts"
                files={demoContent}
                customSetup={{
                  dependencies: {
                    csar: 'latest',
                    immer: '9.0.7',
                    zustand: '4.1.0',
                  },
                }}
                options={{
                  editorHeight: '500px',
                  editorWidthPercentage: 60,
                  activeFile: '/src/app-state/state.ts',
                }}
              />
            </div>
          </div>
          <div className="card flex full col">
            <span className="header">What is this?</span>
            <div>
              <code className="language-tsx">csar</code> is a
              <code>zustand</code>
              middleware that allows you to create a state and manage it with an
              async reducer. It's pretty much like zustand's redux middleware,
              except that
              <ul>
                <li>
                  You can use <b>async function as reducers</b>
                </li>
                <li>
                  You can{' '}
                  <code className="language-typescript">dispatch()</code>
                  <b> inside reducer</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="card flex full col">
            <span className="header">What's the use?</span>
            <p>The result of the features above is that</p>
            <ul>
              <li>
                <b>Async reducers</b> - Network calls can be made in reducers,
                all business logic can live in one place. No need for multiple
                plugins to achieve async state updates outside of a component.
              </li>
              <li>
                <b>Dispatch inside reducers</b> - Easy to orchestrate a sequence
                of actions with another action.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

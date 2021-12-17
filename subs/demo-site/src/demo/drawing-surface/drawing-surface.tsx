import React, { useCallback, useMemo } from 'react'

import { gridSize, init } from '../app-state/init'
import { dispatch } from '../app-state/state'
import { scale } from './settings'
import { Single } from './single'

import './style.css'

export const DrawingSurface: React.FC = () => {
  const content = useMemo(
    () =>
      init.values.map((_, row) =>
        _.map((_, col) => <Single row={row} col={col} key={`${row}-${col}`} />)
      ),
    []
  )

  const onClear = useCallback(() => dispatch({ type: 'clear' }), [])

  const style = useMemo(
    () => ({ width: `${init.values[0].length * scale}rem` }),
    []
  )

  return (
    <div className="flex col center gap" style={style}>
      <div className="flex col center">
        <span>Draw with a mouse here</span>
        <span style={{ fontSize: '0.8rem', textAlign: 'center' }}>
          Each "pixel" you see here is a <code>div</code> connected to state.
          moving mouse over each one with click button down will fill the pixel.
          There are {gridSize * gridSize} <code>div</code>s here in total.
        </span>
      </div>
      <div className="flex wrap drawing-container">{content}</div>
      <button onClick={onClear}>Clear</button>
    </div>
  )
}

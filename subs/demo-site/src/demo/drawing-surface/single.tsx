import React, { MouseEventHandler, useCallback } from 'react'
import { dispatch, useStateSelector } from '../app-state/state'
import { scale } from './settings'

export const Single: React.FC<{ row: number; col: number }> = React.memo(
  ({ row, col }) => {
    const isMarked = useStateSelector((state) => state.values[row][col])

    const mark = useCallback(() => {
      dispatch({
        type: 'mark',
        payload: {
          x: row,
          y: col,
        },
      })
    }, [col, row])

    const onMove: MouseEventHandler<HTMLDivElement> = useCallback(
      (e) => {
        if (e.buttons) {
          mark()
        }
      },
      [mark]
    )

    return (
      <div
        style={{
          width: `${scale}rem`,
          height: `${scale}rem`,
          backgroundColor: isMarked ? '#000' : 'transparent',
        }}
        draggable={false}
        className="single"
        onMouseEnter={onMove}
      />
    )
  }
)

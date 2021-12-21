import { useRef, useState, useEffect, useCallback } from 'react'
import { dummyStateUpdate } from '../defaults'

export function getReactRenderer<F extends Function>(
  fn: F,
  unregister: (fn: F) => void
) {
  const fnRef = useRef(fn)
  // somehow useState seems to be less blocking than useReducer
  const [, setState] = useState(0)
  useEffect(() => () => unregister(fnRef.current), [])
  return useCallback(() => setState(dummyStateUpdate), [])
}

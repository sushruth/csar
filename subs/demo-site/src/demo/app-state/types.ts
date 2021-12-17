export type State = {
  values: boolean[][]
}

export type Actions =
  | {
      type: 'mark'
      payload: {
        x: number
        y: number
      }
    }
  | {
      type: 'clear'
    }

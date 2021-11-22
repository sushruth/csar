import { State } from "./types";

const gridSize = 100;

export const init: State = {
  selected: Array(gridSize)
    .fill(0)
    .map(() => Array(gridSize).fill(false)),
  selectedIndices: {
    i: 0,
    j: 0,
  },
};

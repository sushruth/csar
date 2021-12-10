import { State } from "./types";

export const gridSize = 50;

export const init: State = {
  values: Array(gridSize)
    .fill(null)
    .map(() => Array(gridSize).fill(false))
};

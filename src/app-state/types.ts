export type State = {
  selected: boolean[][];
  selectedIndices: {
    i: number,
    j: number
  };
};

export type Actions = {
  type: "change";
  payload: {
    i: number,
    j: number
  }
};

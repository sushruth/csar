import * as React from "react";
import { useCallback, useEffect } from "react";
import { init } from "./app-state/init";
import { useStateSelector, dispatch } from "./app-state/state";
import "./styles.css";

export default function App() {
  const selectedIndices = useStateSelector((state) => state.selectedIndices);

  return (
    <>
      <h1>
        Selected = {selectedIndices.i}, {selectedIndices.j}
      </h1>
      <Grid />
    </>
  );
}

const Grid: React.FC = () => {
  return (
    <ul className="col">
      {init.selected.map((row, i) => (
        <li key={i} className="row">
          {row.map((_, j) => (
            <span key={j}>
              <CustomComp i={i} j={j} />
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
};

const CustomComp: React.FC<{ i: number; j: number }> = ({ i, j }) => {
  const isSelected = useStateSelector((state) => state.selected[i][j]);
  const onClick = useCallback(
    () =>
      dispatch({
        type: "change",
        payload: {
          i,
          j,
        },
      }),
    [i, j]
  );

  return (
    <div className="smallest" onMouseEnter={onClick} onClick={onClick}>
      {isSelected ? "✅" : "🟦"}
    </div>
  );
};

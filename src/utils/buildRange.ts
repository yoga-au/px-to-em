import { Range } from "vscode";
import type { Selection } from "vscode";

const buildRange = (selections: Selection[]) => {
  const rangeArr = selections.map((selection) => {
    const range = new Range(selection.start, selection.end);

    return range;
  });

  return rangeArr;
};

export default buildRange;

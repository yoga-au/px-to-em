import * as vscode from "vscode";

const buildRange = (selections: vscode.Selection[]) => {
  const rangeArr = selections.map((selection) => {
    const range = new vscode.Range(selection.start, selection.end);

    return range;
  });

  return rangeArr;
};

export default buildRange;

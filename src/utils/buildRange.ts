import * as vsocde from "vscode";

const buildRange = (start: vsocde.Position, end: vsocde.Position) => {
  return new vsocde.Range(start, end);
};

export default buildRange;

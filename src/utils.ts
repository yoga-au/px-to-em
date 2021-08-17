import * as vscode from "vscode";

// CHANGE THIS to vscode configuration contirbution point
const basePixel = 16;

export const builtRange = (start: vscode.Position, end: vscode.Position) => {
  return new vscode.Range(start, end);
};

export const isPx = (value: string) => {
  return value.endsWith("px");
};

export const convertToEm = (value: string) => {
  // extract value
  const indexOfPx = value.indexOf("px");
  const numValue = parseFloat(value.slice(0, indexOfPx));

  // conversion to em
  const convertResult = numValue / basePixel;
  return convertResult.toString();
};

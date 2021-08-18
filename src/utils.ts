import * as vscode from "vscode";

// CHANGE THIS to vscode configuration contirbution point
const basePixel = 16;

type UnitType = "px" | "em" | "rem";

export const builtRange = (start: vscode.Position, end: vscode.Position) => {
  return new vscode.Range(start, end);
};

export const checkUnit = (value: string, unit: UnitType) => {
  return value.endsWith(unit);
};

export const convert = (value: string, unit: UnitType) => {
  if (unit === "px") {
    // extract value
    const indexOfPx = value.indexOf("px");
    const numValue = parseFloat(value.slice(0, indexOfPx));

    // conversion to em
    const convertResult = numValue / basePixel;
    return convertResult.toString();
  }

  if (unit === "em") {
    // extract value
    const indexOfEm = value.indexOf("em");
    const numValue = parseFloat(value.slice(0, indexOfEm));

    // conversion to em
    const convertResult = numValue * basePixel;
    return convertResult.toString();
  }

  if (unit === "rem") {
    // extract value
    const indexOfRem = value.indexOf("rem");
    const numValue = parseFloat(value.slice(0, indexOfRem));

    // conversion to em
    const convertResult = numValue * basePixel;
    return convertResult.toString();
  }
};

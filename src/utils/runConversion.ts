import * as vscode from "vscode";
import { convert, buildRange } from "./index";
import type { UnitType } from "../types/index";

const runConversion = (
  rootFont: number,
  succNotif: boolean,
  currUnit: UnitType,
  toUnit: UnitType
) => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const errorMessage = vscode.window.showErrorMessage;

  if (!textEditor) {
    return errorMessage("No file is open");
  }

  if (textEditor.selections.every((selection) => selection.isEmpty)) {
    return errorMessage("No selection is detected");
  }

  const rangeArr = buildRange(textEditor.selections);

  const convertResult = rangeArr.flatMap((range) => {
    const value = textEditor.document.getText(range);
    const valueArr = value.split(" ");

    if (!value.endsWith(currUnit)) {
      return [];
    }

    const convertedValue = valueArr
      .map((string) => {
        if (!string.endsWith(currUnit)) {
          return string;
        }

        return `${convert(string, currUnit, rootFont)}${toUnit}`;
      })
      .join(" ");

    return { range, value, converted: convertedValue };
  });

  if (!convertResult.length) {
    return errorMessage(`No ${currUnit} value is detected`);
  }

  // REMINDER: put loop inside textEditor edit method to perform multiple replace method
  textEditor
    .edit((editBuilder) => {
      for (const item of convertResult) {
        editBuilder.replace(item.range, item.converted);
      }
    })
    .then((resolved) => {
      if (resolved === false) {
        return errorMessage(
          "Error: something went wrong when converting the value"
        );
      }

      if (!succNotif) {
        return infoMessage(
          `Successfuly perform conversion with root font size of ${rootFont}`
        );
      }
    });
};

export default runConversion;

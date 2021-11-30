import * as vscode from "vscode";
import { buildRange, convert, checkUnit } from "../utils/index";

const emToPx = (...args: any[]): any => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const errorMessage = vscode.window.showErrorMessage;

  // get configuration value from pixelToEm.basePixel
  const config = vscode.workspace.getConfiguration("pxToEm");
  const rootPixel = config.get<number>("rootPixel", 16);
  const disableSuccessNotification = config.get<boolean>(
    "disableSuccessNotification",
    true
  );

  if (!textEditor) {
    return errorMessage("No file is open");
  }

  if (textEditor.selection.start && textEditor.selection.end) {
    const range = buildRange(
      textEditor.selection.start,
      textEditor.selection.end
    );

    const selectionValue = textEditor.document.getText(range);

    // if no selection or selection are empty
    if (selectionValue === "") {
      return errorMessage("No selection is detected");
    }

    // check if its end with em/rem
    if (!checkUnit(selectionValue, "em") && !checkUnit(selectionValue, "rem")) {
      return errorMessage("The selection is not detected as em/rem value");
    }

    // run conversion for rem
    if (checkUnit(selectionValue, "rem") && rootPixel) {
      const convertResult = `${convert(selectionValue, "rem", rootPixel)}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          if (!disableSuccessNotification) {
            infoMessage(
              `Successfuly perform conversion with root pixel of ${rootPixel}`
            );
          }
        });

      return;
    }

    if (rootPixel) {
      // run conversion for em
      const convertResult = `${convert(selectionValue, "em", rootPixel)}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          if (!disableSuccessNotification) {
            infoMessage(
              `Successfuly perform conversion with root pixel of ${rootPixel}`
            );
          }
        });

      return;
    }
  }

  errorMessage("Error: Something went wrong");
};

export default emToPx;

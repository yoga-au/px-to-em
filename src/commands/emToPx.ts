import * as vscode from "vscode";
import { buildRange, convert, checkUnit } from "../utils/index";

const emToPx = (...args: any[]): any => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const errorMessage = vscode.window.showErrorMessage;

  // get configuration value from pixelToEm.basePixel
  const config = vscode.workspace.getConfiguration("pxToEm");
  const basePixel = config.get<number>("basePixel", 16);
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
    if (checkUnit(selectionValue, "rem") && basePixel) {
      const convertResult = `${convert(selectionValue, "rem", basePixel)}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          if (!disableSuccessNotification) {
            infoMessage(
              `Sucessfully convert the value from REM to PX with base pixel of ${basePixel}`
            );
          }
        });

      return;
    }

    if (basePixel) {
      // run conversion for em
      const convertResult = `${convert(selectionValue, "em", basePixel)}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          if (!disableSuccessNotification) {
            infoMessage(
              `Sucessfully convert the value from EM to PX with base pixel of ${basePixel}`
            );
          }
        });

      return;
    }
  }

  errorMessage("Error: Something went wrong");
};

export default emToPx;

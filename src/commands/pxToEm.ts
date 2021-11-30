import * as vscode from "vscode";
import { buildRange, convert, checkUnit } from "../utils/index";

const pxToEm = (...args: any[]): any => {
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

  // check if there's no open file
  if (!textEditor) {
    return errorMessage("No file is open");
  }

  // check if selection actually exist
  if (textEditor && textEditor.selection.start && textEditor.selection.end) {
    const range = buildRange(
      textEditor.selection.start,
      textEditor.selection.end
    );

    const selectionValue = textEditor.document.getText(range);

    // if no selection or selection are empty
    if (selectionValue === "") {
      return errorMessage(
        "No selection is detected, if this error is false positive try to reload your vscode"
      );
    }

    // check if its end with px
    if (!checkUnit(selectionValue, "px")) {
      return errorMessage("The selection is not detected as pixel value");
    }

    if (rootPixel) {
      const convertResult = `${convert(selectionValue, "px", rootPixel)}em`;
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

export default pxToEm;

import * as vscode from "vscode";
import { convert } from "../utils/index";

// TODO: Working on refactoring em to px (follow px to em)
// NOTE: buildRange utility function can be refactored to use map method internally

const pxToEm = (...args: any[]): any => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const warningMessage = vscode.window.showWarningMessage;
  const errorMessage = vscode.window.showErrorMessage;
  let problemCount = 0;

  const config = vscode.workspace.getConfiguration("pxToEm");
  const rootPixel = config.get<number>("rootFontSize", 16);
  const disableSuccessNotification = config.get<boolean>(
    "disableSuccessNotification",
    true
  );

  if (!textEditor) {
    return errorMessage("No file is open");
  }

  if (textEditor.selections.length === 1) {
    if (textEditor.selection.isEmpty) {
      return errorMessage("No selection is detected");
    }

    // SECTION: Start of single selection feature code
    if (textEditor.selection.isSingleLine) {
      const range = new vscode.Range(
        textEditor.selection.start,
        textEditor.selection.end
      );
      const value = textEditor.document.getText(range);

      if (!value.endsWith("px")) {
        return errorMessage("The selection is not detected as pixel value");
      }

      const convertResult = `${convert(value, "px", rootPixel)}em`;
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then((resolved) => {
          if (resolved === false) {
            return errorMessage("Error: something went wrong");
          }

          if (!disableSuccessNotification) {
            return infoMessage(
              `Successfuly perform conversion with root pixel of ${rootPixel}`
            );
          }
        });

      return;
    }
  }

  // SECTION: Start of multi selection feature code
  const convertResult = textEditor.selections.flatMap((item) => {
    const range = new vscode.Range(item.start, item.end);
    const value = textEditor.document.getText(range);

    if (!value.endsWith("px") || !value) {
      problemCount += 1;
      return [];
    }

    const converted = `${convert(value, "px", rootPixel)}em`;

    return [{ range, value, converted }];
  });

  // REMINDER: put loop inside textEditor edit method to perform multiple replace method
  textEditor
    .edit((editBuilder) => {
      for (const item of convertResult) {
        editBuilder.replace(item.range, item.converted);
      }
    })
    .then((resolved) => {
      if (resolved === false) {
        return errorMessage("Error: something went wrong");
      }

      if (problemCount) {
        return warningMessage(
          `Successfuly perform conversion with root pixel of ${rootPixel}, but there are ${problemCount} problems encountered.`
        );
      }

      if (!disableSuccessNotification) {
        return infoMessage(
          `Successfuly perform conversion with root pixel of ${rootPixel}`
        );
      }
    });
};

export default pxToEm;

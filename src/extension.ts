import * as vscode from "vscode";
import { builtRange, isPx, convertToEm } from "./utils";

// TODO:
// - replace selection

const textEditor = vscode.window.activeTextEditor;
const infoMessage = vscode.window.showInformationMessage;
const errorMessage = vscode.window.showErrorMessage;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "px-to-em" is now active!');

  // command list
  const pxToEmCmd = "px-to-em.pxToEm";

  const pxToEm = vscode.commands.registerCommand(pxToEmCmd, () => {
    if (textEditor?.selection.start && textEditor.selection.end) {
      const range = builtRange(
        textEditor.selection.start,
        textEditor.selection.end
      );

      const selectionValue = textEditor.document.getText(range);

      // if no selection or selection are empty
      if (selectionValue === "") {
        return errorMessage("Empty String");
      }

      // check if its end with px
      if (!isPx(selectionValue)) {
        return errorMessage("The selection is not a pixel value");
      }

      const convertResult = `${convertToEm(selectionValue)}em`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor.edit((editBuilder) => {
        editBuilder.replace(range, convertResult);
      });

      infoMessage("Sucess");
      return;
    }

    errorMessage("Error");
  });

  context.subscriptions.push(pxToEm);
}

export function deactivate() {}

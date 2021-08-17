import * as vscode from "vscode";
import { builtRange, isPx, convertToEm } from "./utils";

// TODO:
// - add handler when range undefined
// - extract value from selection
// - conversion to em/rem

// RESEARCH:
// checking if value ends with certain unit
// const str1 = '24px';
// console.log(str1.endsWith('px'));
// ----
// extract number from value
// const str = "16px";
// console.log(str.indexOf("px"));
// console.log(str.slice(0, str.indexOf('px')));

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

      console.log(`${convertToEm(selectionValue)}em`);
      infoMessage("Sucess");
      return;
    }

    errorMessage("Error");
  });

  context.subscriptions.push(pxToEm);
}

export function deactivate() {}

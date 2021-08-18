import * as vscode from "vscode";
import { builtRange, checkUnit, convert } from "./utils";

// TODO:
// - em to px function
// - add config for base pixel/root pixel

const textEditor = vscode.window.activeTextEditor;
const infoMessage = vscode.window.showInformationMessage;
const errorMessage = vscode.window.showErrorMessage;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "px-to-em" is now active!');

  // command list
  const pxToEmCmd = "px-to-em.pxToEm";
  const emToPxCmd = "px-to-em.emToPx";

  // conversion from px to em
  const pxToEm = vscode.commands.registerCommand(pxToEmCmd, () => {
    if (!textEditor) {
      return errorMessage("No file is open");
    }

    if (textEditor?.selection.start && textEditor.selection.end) {
      const range = builtRange(
        textEditor.selection.start,
        textEditor.selection.end
      );

      const selectionValue = textEditor.document.getText(range);

      // if no selection or selection are empty
      if (selectionValue === "") {
        return errorMessage("No selection is detected");
      }

      // check if its end with px
      if (!checkUnit(selectionValue, "px")) {
        return errorMessage("The selection is not detected as pixel value");
      }

      const convertResult = `${convert(selectionValue, "px")}em`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          infoMessage("Sucessfully convert the value from PX to EM");
        });

      return;
    }

    errorMessage("Error: Something went wrong");
  });

  // conversion em to px
  const emToPx = vscode.commands.registerCommand(emToPxCmd, () => {
    if (!textEditor) {
      return errorMessage("No file is open");
    }

    if (textEditor.selection.start && textEditor.selection.end) {
      const range = builtRange(
        textEditor.selection.start,
        textEditor.selection.end
      );

      const selectionValue = textEditor.document.getText(range);

      // if no selection or selection are empty
      if (selectionValue === "") {
        return errorMessage("No selection is detected");
      }

      // check if its end with px
      if (
        !checkUnit(selectionValue, "em") &&
        !checkUnit(selectionValue, "rem")
      ) {
        return errorMessage("The selection is not detected as em/rem value");
      }

      // run conversion for rem
      if (checkUnit(selectionValue, "rem")) {
        const convertResult = `${convert(selectionValue, "rem")}px`;
        console.log(convertResult);

        // replace selection with conversion result
        textEditor
          .edit((editBuilder) => {
            editBuilder.replace(range, convertResult);
          })
          .then(() => {
            infoMessage("Sucessfully convert the value from EM/REM to PX");
          });

        return;
      }

      // run conversion for em
      const convertResult = `${convert(selectionValue, "em")}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          infoMessage("Sucessfully convert the value from EM/REM to PX");
        });

      return;
    }

    errorMessage("Error: Something went wrong");
  });

  context.subscriptions.push(pxToEm, emToPx);
}

export function deactivate() {}

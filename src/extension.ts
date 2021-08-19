import * as vscode from "vscode";
import { builtRange, checkUnit, convert } from "./utils";

// TODO:
// - refactor callback function in registerCommand()
// - handle multiple selection

const textEditor = vscode.window.activeTextEditor;
const infoMessage = vscode.window.showInformationMessage;
const errorMessage = vscode.window.showErrorMessage;

// get configuration value from pixelToEm.basePixel
const config = vscode.workspace.getConfiguration("pxToEm");
const basePixel: any = config.get("basePixel");

export function activate(context: vscode.ExtensionContext) {
  // console.log('Congratulations, your extension "px-to-em" is now active!');

  // command list
  const pxToEmCmd = "px-to-em.pxToEm";
  const emToPxCmd = "px-to-em.emToPx";

  // conversion from px to em
  const pxToEm = vscode.commands.registerCommand(pxToEmCmd, () => {
    // check if there's no open file
    if (!textEditor) {
      return errorMessage("No file is open");
    }

    // check if selection actually exist
    if (textEditor?.selection.start && textEditor.selection.end) {
      const range = builtRange(
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

      const convertResult = `${convert(selectionValue, "px", basePixel)}em`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          infoMessage(
            `Sucessfully convert the value from PX to EM with base pixel of ${basePixel}`
          );
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

      // check if its end with em/rem
      if (
        !checkUnit(selectionValue, "em") &&
        !checkUnit(selectionValue, "rem")
      ) {
        return errorMessage("The selection is not detected as em/rem value");
      }

      // run conversion for rem
      if (checkUnit(selectionValue, "rem")) {
        const convertResult = `${convert(selectionValue, "rem", basePixel)}px`;
        console.log(convertResult);

        // replace selection with conversion result
        textEditor
          .edit((editBuilder) => {
            editBuilder.replace(range, convertResult);
          })
          .then(() => {
            infoMessage(
              `Sucessfully convert the value from REM to PX with base pixel of ${basePixel}`
            );
          });

        return;
      }

      // run conversion for em
      const convertResult = `${convert(selectionValue, "em", basePixel)}px`;
      console.log(convertResult);

      // replace selection with conversion result
      textEditor
        .edit((editBuilder) => {
          editBuilder.replace(range, convertResult);
        })
        .then(() => {
          infoMessage(
            `Sucessfully convert the value from EM to PX with base pixel of ${basePixel}`
          );
        });

      return;
    }

    errorMessage("Error: Something went wrong");
  });

  context.subscriptions.push(pxToEm, emToPx);
}

export function deactivate() {}

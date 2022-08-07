import * as vscode from "vscode";
import { pxToEm, emToPx } from "./commands/index";
import { convert } from "./utils/index";

// TODO:
// - refactor callback function in registerCommand()
// -- refactor to use hooks (consideration)

export function activate(context: vscode.ExtensionContext) {
  const textEditor = vscode.window.activeTextEditor;
  const errorMessage = vscode.window.showErrorMessage;

  context.subscriptions.push(
    vscode.commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    vscode.commands.registerCommand("px-to-em.emToPx", () => emToPx()),
    vscode.commands.registerCommand("px-to-em.devCommand", () => {
      if (!textEditor) {
        return errorMessage("No file is open");
      }

      const range = new vscode.Range(
        textEditor.selection.start,
        textEditor.selection.end
      );

      const value = textEditor.document.getText(range);

      // after split check if at least one member of array its px
      // then do map
      // then join
      // pass it to edit builder
      const arrValue = value.split(" ");

      if (!arrValue.some((string) => string.endsWith("px"))) {
        return errorMessage("Error");
      }

      const arrConverted = arrValue.flatMap((string) => {
        if (!string.endsWith("px")) {
          return [];
        }

        return `${convert(string, "px", 16)}em`;
      });

      console.log(arrConverted.join(" "));
    })
  );
}

export function deactivate() {}

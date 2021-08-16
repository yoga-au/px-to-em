import * as vscode from "vscode";

// TODO:
// - conversion to em/rem
// - add handler when range undefined

const textEditor = vscode.window.activeTextEditor;

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "px-to-em" is now active!');

  // command list
  const pxToEm = "px-to-em.pxToEm";

  const disposable = vscode.commands.registerCommand(pxToEm, () => {
    // console.log(textEditor?.selection.start, textEditor?.selection.end);
    // const range = new vscode.Range(
    //   textEditor?.selection.start!,
    //   textEditor?.selection.end!
    // );
    if (textEditor?.selection.start && textEditor.selection.end) {
      const range = new vscode.Range(
        textEditor.selection.start,
        textEditor.selection.end
      );

      console.log(textEditor?.document.getText(range));
      vscode.window.showInformationMessage("Hello World from px-to-em!");
      return;
    }

    vscode.window.showErrorMessage("Error");
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}

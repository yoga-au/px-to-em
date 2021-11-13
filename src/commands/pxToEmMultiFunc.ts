import * as vscode from "vscode";

const pxToEmMultiFunc = (...args: any[]): any => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const errorMessage = vscode.window.showErrorMessage;

  if (!textEditor) {
    return errorMessage("No file is open");
  }

  return infoMessage("PX to EM Multiple Selections");
};

export default pxToEmMultiFunc;

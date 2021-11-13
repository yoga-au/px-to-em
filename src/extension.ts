import * as vscode from "vscode";
import { pxToEmFunc, emToPxFunc, pxToEmMultiFunc } from "./commands/index";

// TODO:
// - refactor callback function in registerCommand()
// - handle multiple selection

export function activate(context: vscode.ExtensionContext) {
  // command list
  const pxToEmCmd = "px-to-em.pxToEm";
  const emToPxCmd = "px-to-em.emToPx";
  const pxToEmMultiCmd = "px-to-em.pxToEmMulti";

  // conversion from px to em
  const pxToEm = vscode.commands.registerCommand(pxToEmCmd, () => pxToEmFunc());

  // conversion em to px
  const emToPx = vscode.commands.registerCommand(emToPxCmd, () => emToPxFunc());

  // test multi selection
  const pxToEmMulti = vscode.commands.registerCommand(pxToEmMultiCmd, () =>
    pxToEmMultiFunc()
  );

  context.subscriptions.push(pxToEm, emToPx, pxToEmMulti);
}

export function deactivate() {}

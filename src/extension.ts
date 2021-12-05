import * as vscode from "vscode";
import { pxToEm, emToPx } from "./commands/index";

// TODO:
// - refactor callback function in registerCommand()
// - handle multiple selection
// - change root pixel -> root font-size

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    vscode.commands.registerCommand("px-to-em.emToPx", () => emToPx())
    // vscode.commands.registerCommand("px-to-em.pxToEmMulti", () => pxToEmMulti())
  );
}

export function deactivate() {}

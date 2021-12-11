import * as vscode from "vscode";
import { pxToEm, emToPx } from "./commands/index";

// TODO:
// - refactor callback function in registerCommand()
// -- refactor to use hooks (consideration)

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    vscode.commands.registerCommand("px-to-em.emToPx", () => emToPx())
  );
}

export function deactivate() {}

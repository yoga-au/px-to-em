import * as vscode from "vscode";
import { pxToEm, emToPx, pxToRem, remToPx } from "./commands/index";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    vscode.commands.registerCommand("px-to-em.emToPx", () => emToPx()),
    vscode.commands.registerCommand("px-to-em.pxToRem", () => pxToRem()),
    vscode.commands.registerCommand("px-to-em.remToPx", () => remToPx())
  );
}

export function deactivate() {}

import { commands, ExtensionContext } from "vscode";
import {
  pxToEm,
  emToPx,
  pxToRem,
  remToPx,
  changeRootFont,
} from "./commands/index";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    commands.registerCommand("px-to-em.emToPx", () => emToPx()),
    commands.registerCommand("px-to-em.pxToRem", () => pxToRem()),
    commands.registerCommand("px-to-em.remToPx", () => remToPx()),
    commands.registerCommand("px-to-em.changeRootFont", () => changeRootFont())
  );
}

export function deactivate() {}

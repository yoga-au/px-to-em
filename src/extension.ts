import { commands, languages } from "vscode";
import {
  pxToEm,
  emToPx,
  pxToRem,
  remToPx,
  changeRootFont,
} from "./commands/index";
import { ConvertPxEm } from "./actions/convertPxEm";

import type { ExtensionContext } from "vscode";

// TODO: create config for document selector in code actions provider
// TODO: don't trigger code action when selection not exist

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    commands.registerCommand("px-to-em.emToPx", () => emToPx()),
    commands.registerCommand("px-to-em.pxToRem", () => pxToRem()),
    commands.registerCommand("px-to-em.remToPx", () => remToPx()),
    commands.registerCommand("px-to-em.changeRootFont", () => changeRootFont()),
    languages.registerCodeActionsProvider(
      ["css"],
      new ConvertPxEm(
        "px-to-em.pxToEm",
        "px-to-em.emToPx",
        "px-to-em.pxToRem",
        "px-to-em.remToPx"
      ),
      {
        providedCodeActionKinds: ConvertPxEm.providedCodeActionKinds,
      }
    )
  );
}

export function deactivate() {}

import { commands, languages, workspace, window } from "vscode";
import {
  pxToEm,
  emToPx,
  pxToRem,
  remToPx,
  changeRootFont,
} from "./commands/index";
import { ConvertPxEm } from "./actions/convertPxEm";

import type { ExtensionContext, ConfigurationChangeEvent } from "vscode";

const showRestartMessage = async ({
  affectsConfiguration,
}: ConfigurationChangeEvent) => {
  if (affectsConfiguration("pxToEm.codeAction.enabled")) {
    window
      .showWarningMessage(
        "Reloading VS Code is required to apply changes",
        "Reload",
        "Ignore"
      )
      .then((action) => {
        if (action && action === "Reload") {
          commands.executeCommand("workbench.action.reloadWindow");
        }
      });
  }
};

// ! PROBLEM: the code actions only activate when css file is selected
// TODO: figure out how to activate code actions dynamically/in all files

export function activate(context: ExtensionContext) {
  const codeActionConfig = workspace
    .getConfiguration("pxToEm")
    .get<string[]>("codeAction.enabled", ["css"]);

  workspace.onDidChangeConfiguration((e) => showRestartMessage(e));

  context.subscriptions.push(
    commands.registerCommand("px-to-em.pxToEm", () => pxToEm()),
    commands.registerCommand("px-to-em.emToPx", () => emToPx()),
    commands.registerCommand("px-to-em.pxToRem", () => pxToRem()),
    commands.registerCommand("px-to-em.remToPx", () => remToPx()),
    commands.registerCommand("px-to-em.changeRootFont", () => changeRootFont()),
    languages.registerCodeActionsProvider(
      codeActionConfig,
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

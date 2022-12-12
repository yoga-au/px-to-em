import { CodeActionKind, CodeAction } from "vscode";

import type { CodeActionProvider, Command, ProviderResult } from "vscode";

interface CreateCommandParams {
  title: string;
  commandName: string;
  commandTitle: string;
  commandTooltip?: string;
}

export class ConvertPxEm implements CodeActionProvider {
  pxEmCmd: string;
  emPxCmd: string;
  pxRemCmd: string;
  remPxCmd: string;

  constructor(
    pxEmCmd: string,
    emPxCmd: string,
    pxRemCmd: string,
    remPxCmd: string
  ) {
    this.pxEmCmd = pxEmCmd;
    this.emPxCmd = emPxCmd;
    this.pxRemCmd = pxRemCmd;
    this.remPxCmd = remPxCmd;
  }

  public static readonly providedCodeActionKinds = [
    CodeActionKind.RefactorRewrite,
  ];

  public provideCodeActions(): ProviderResult<(CodeAction | Command)[]> {
    const pxToEmCommand = this.createCommand({
      title: "Convert PX to EM",
      commandName: this.pxEmCmd,
      commandTitle: "Convert current selection from PX to EM unit",
      commandTooltip: "Convert current selection from PX to EM unit",
    });
    const emToPxCommand = this.createCommand({
      title: "Convert EM to PX",
      commandName: this.emPxCmd,
      commandTitle: "Convert current selection from EM to PX unit",
      commandTooltip: "Convert current selection from EM to PX unit",
    });
    const pxToRemCommand = this.createCommand({
      title: "Convert PX to REM",
      commandName: this.pxRemCmd,
      commandTitle: "Convert current selection from PX to REM unit",
      commandTooltip: "Convert current selection from PX to REM unit",
    });
    const remToPxCommand = this.createCommand({
      title: "Convert REM to PX",
      commandName: this.remPxCmd,
      commandTitle: "Convert current selection from REM to PX unit",
      commandTooltip: "Convert current selection from REM to PX unit",
    });

    return [pxToEmCommand, emToPxCommand, pxToRemCommand, remToPxCommand];
  }

  private createCommand({
    title,
    commandName,
    commandTitle,
    commandTooltip,
  }: CreateCommandParams): CodeAction {
    const action = new CodeAction(title, CodeActionKind.RefactorRewrite);
    action.command = {
      command: commandName,
      title: commandTitle,
      tooltip: commandTooltip,
    };

    return action;
  }
}

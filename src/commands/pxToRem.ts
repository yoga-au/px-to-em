import * as vscode from "vscode";
import { runConversion } from "../utils/index";

const pxToRem = () => {
  const config = vscode.workspace.getConfiguration("pxToEm");
  const rootFontSize = config.get<number>("rootFontSize", 16);
  const disableSuccessNotification = config.get<boolean>(
    "disableSuccessNotification",
    true
  );

  runConversion(rootFontSize, disableSuccessNotification, "px", "rem");
};

export default pxToRem;

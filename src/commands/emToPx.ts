import * as vscode from "vscode";
import { runConversion } from "../utils/index";

const emToPx = () => {
  const config = vscode.workspace.getConfiguration("pxToEm");
  const rootFontSize = config.get<number>("rootFontSize", 16);
  const disableSuccessNotification = config.get<boolean>(
    "disableSuccessNotification",
    true
  );

  runConversion(rootFontSize, disableSuccessNotification, "em", "px");
};

export default emToPx;

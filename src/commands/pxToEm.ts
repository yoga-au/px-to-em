import * as vscode from "vscode";
import { runConversion } from "../utils/index";

const pxToEm = () => {
  const config = vscode.workspace.getConfiguration("pxToEm");
  const rootFontSize = config.get<number>("rootFontSize", 16);

  runConversion(rootFontSize, "px", "em");
};

export default pxToEm;

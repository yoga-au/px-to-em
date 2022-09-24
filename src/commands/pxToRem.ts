import { workspace } from "vscode";
import { runConversion } from "../utils/index";

const pxToRem = () => {
  const config = workspace.getConfiguration("pxToEm");
  const rootFontSize = config.get<number>("rootFontSize", 16);

  runConversion(rootFontSize, "px", "rem");
};

export default pxToRem;

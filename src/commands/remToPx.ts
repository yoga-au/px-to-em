import { workspace } from "vscode";
import { runConversion } from "../utils/index";

const remToPx = () => {
  const config = workspace.getConfiguration("pxToEm");
  const rootFontSize = config.get<number>("rootFontSize", 16);

  runConversion(rootFontSize, "rem", "px");
};

export default remToPx;

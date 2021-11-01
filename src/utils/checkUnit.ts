import * as vsocde from "vscode";
import { UnitType } from "../types/index";

const checkUnit = (value: string, unit: UnitType) => {
  return value.endsWith(unit);
};

export default checkUnit;

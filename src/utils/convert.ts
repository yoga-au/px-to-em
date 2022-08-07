import { UnitType } from "../types/index";

const convert = (value: string, unit: UnitType, basePixel: number) => {
  if (unit === "px") {
    // extract value
    const indexOfPx = value.indexOf("px");
    const numValue = parseFloat(value.slice(0, indexOfPx));

    // conversion to em
    const convertResult = numValue / basePixel;
    return convertResult.toString();
  }

  if (unit === "em") {
    // extract value
    const indexOfEm = value.indexOf("em");
    const numValue = parseFloat(value.slice(0, indexOfEm));

    // conversion to em
    const convertResult = numValue * basePixel;
    return convertResult.toString();
  }

  if (unit === "rem") {
    // extract value
    const indexOfRem = value.indexOf("rem");
    const numValue = parseFloat(value.slice(0, indexOfRem));

    // conversion to em
    const convertResult = numValue * basePixel;
    return convertResult.toString();
  }
};

export default convert;

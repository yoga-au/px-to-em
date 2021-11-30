import * as vscode from "vscode";
import { convert } from "../utils/index";

// Flow
// 1. Create array of vsocde.Range from textEditor.selections
// 2. Define variable, represent if there's problem or not (boolean?)
// 3. Create array of object that contain value from selection with model of { range, selectionValue: getText } by using map
// 3a. inside map check if it's empty sring and check the unit match the command, if false return nothing and add something to the variable in step 2
// 4 do loop from array from step 3
// 4b in the loop, do conversion (textEditor.replace)
// 4c after loop end, do if statement, if variable from step 2 exist return a warning message, if not return info message (success);

// NOTE: buildRange utility function can be refactored to use map method internally

const pxToEmMulti = (...args: any[]): any => {
  const textEditor = vscode.window.activeTextEditor;
  const infoMessage = vscode.window.showInformationMessage;
  const warningMessage = vscode.window.showWarningMessage;
  const errorMessage = vscode.window.showErrorMessage;
  let problemCount = 0;

  const config = vscode.workspace.getConfiguration("pxToEm");
  const basePixel = config.get<number>("basePixel", 16);

  if (!textEditor) {
    return errorMessage("No file is open");
  }

  const convertResult = textEditor.selections.flatMap((item) => {
    const range = new vscode.Range(item.start, item.end);
    const value = textEditor.document.getText(range);

    if (!value.endsWith("px") || !value) {
      problemCount += 1;
      return [];
    }

    const converted = `${convert(value, "px", basePixel)}em`;

    return [{ range, value, converted }];
  });

  // REMINDER: put loop inside textEditor edit method to perform multiple replace method
  textEditor.edit((editBuilder) => {
    for (const item of convertResult) {
      editBuilder.replace(item.range, item.converted);
    }
  });

  if (problemCount) {
    return warningMessage(
      `Sucessfully convert the values from EM to PX with ${problemCount} problems`
    );
  }

  return infoMessage("PX to EM Multiple Selections");
};

export default pxToEmMulti;

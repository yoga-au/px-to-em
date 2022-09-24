import { window, workspace } from "vscode";

const changeRootFont = async () => {
  const infoMessage = window.showInformationMessage;
  const errorMessage = window.showErrorMessage;
  const inputBox = window.showInputBox;

  try {
    const newRootFont = await inputBox({
      ignoreFocusOut: true,
      prompt: "Root font size used for conversion (in px)",
      title: "Change Root Font",
      validateInput: (value) => {
        const toInt = parseInt(value);

        if (!toInt) {
          return "Please insert a number";
        }
      },
    });

    workspace
      .getConfiguration("pxToEm")
      .update("rootFontSize", newRootFont, true);

    infoMessage(`Successfully change root font size to ${newRootFont}px`);
  } catch (error) {
    console.error(error);
    errorMessage("Something went wrong when changing font size");
  }
};

export default changeRootFont;

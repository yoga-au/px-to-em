# PX to EM

Quickly convert your css px value to em value or vice versa with a simple command.

## Features

You can convert a value by simply do selection to your value want to convert and run the command by typing `Convert to EM` (or `Convert to PX`) in command pallete (`Ctrl+Shift+P` or `Cmd+Shift+P`).

The conversion is using a base pixel of `16`. You can change it in the settings by searching `PX to EM` in settings menu.

[Preview](assets/px-to-em-preview.gif\)

## Extension Settings

This extension contributes the following settings:

- `pixelToEm.basePixel`: Base pixel/root pixel to be used as reference for EM/REM conversion. Most browser have it at 16px as default value if you don't specifically setup the base/root pixel.

## Known Issues

- When selecting a value in shorthand property, it will replace all the value with converted result from the left
- When converting a multiple selection, only first selection is converted.

## Release Notes

### 0.1.0

Initial release of PX to EM.

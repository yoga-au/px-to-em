# PX to EM

Quickly convert your css pixel value to em value or em/rem to pixel with a simple command.

## Features

You can convert a value by simply do selection to your value want to convert and run the command by typing `Convert to EM` (or `Convert to PX`) in command pallete (`Ctrl+Shift+P` or `Cmd+Shift+P`).

The conversion is using a base/root pixel of `16`. You can change it in the settings by searching `PX to EM` in settings menu.

![PX to EM Preview](https://i.imgur.com/7vw7s4K.gif)

## Extension Settings

This extension contributes the following settings:

- `pxToEm.basePixel`: Base pixel/root pixel to be used as reference for EM/REM conversion. Most browser have it at 16px as default value if you don't specifically setup the base/root pixel.
- `pxToEm.disableSuccessNotification`: Disable notification when conversion are successfull.

## Known Issues

- When selecting a value in shorthand property, it will replace all the value with converted result from the left.
- When converting a multiple selection, only first selection is converted.

## Roadmap

- [ ] Multi selection support.

## Release Notes

### 0.1.0

Initial release of PX to EM.

### 0.1.1

- Fix editor detection when switching tab.

### 0.1.2

- Fix galleryBanner text color.

### 0.1.3

- Add new configuration for disabling notification message when conversion are successfull.
- Update extension README file (added new extenstion setting and roadmap).
- Source code refactor (moved some function to separate file).

# PX to EM

Quickly convert your css pixel value to em value or em/rem to pixel with a simple command.

## Features

You can convert a value by simply do selection to your value want to convert and run the command by typing `Convert to EM` (or `Convert to PX`) in command pallete (`Ctrl+Shift+P` or `Cmd+Shift+P`).

By defaault, the conversion is using a root font size of `16`. You can change it in the settings by searching `PX to EM` in settings menu.

![PX to EM Preview](https://i.imgur.com/IzteRCT.gif)

## Extension Settings

This extension contributes the following settings:

- `pxToEm.rootFontSize`: Root font size to be used as reference for conversion. Most browser have it at 16px as default value if you don't specifically setup the root font size in your css.

## Known Issues

- When selecting multiple line of code, the extension only convert the first line of selection

## Roadmap

:white_large_square: Add conversion function to code actions
:white_large_square: Doing conversion on entire file

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

### 0.2.0

- Add multi selection support.
- Fix wording in extension, base pixel to root font size.

### 0.4.0

- Add command for rem conversion.
- Add command to change config of root font size.
- Remove config of disable success notification.

### 0.4.1

- Fix bug when selection have zero value, it never convert even though there's correct value in the selection

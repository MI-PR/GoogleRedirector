# Google Forms Redirect Extension

A Chrome/Firefox browser extension that automatically redirects Google Forms links to include `/u/0/` in the URL, ensuring forms open with your primary Google account.

## Problem

When clicking on Google Forms links while signed into multiple Google accounts, the form might open with the wrong account, causing permissions issues or data to be associated with an unintended account.

## Solution

This extension automatically intercepts Google Forms URLs and redirects them to include `/u/0/` (primary account) in the path, ensuring forms always open with your first Google account.

## How it works

The extension modifies URLs from:
```
https://docs.google.com/forms/d/e/[FORM_ID]/viewform
```

To:
```
https://docs.google.com/forms/u/0/d/e/[FORM_ID]/viewform
```

## Installation

### Chrome
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will be automatically active

### Firefox
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder

## Files

- `manifest.json` - Extension configuration and permissions
- `background.js` - Main extension logic for URL redirection
- `.gitignore` - Git ignore file for development

## Permissions

This extension requires:
- `webRequest` - To intercept and modify web requests
- `webRequestBlocking` - To block and redirect requests
- `*://docs.google.com/forms/*` - Access to Google Forms URLs only

## Privacy

This extension only intercepts and modifies Google Forms URLs. It does not collect, store, or transmit any personal data.

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
# Google Forms Redirect Extension (Multi-Account)

A Chrome/Firefox browser extension that automatically redirects Google Forms links to use your selected Google account, with support for managing multiple accounts through an easy-to-use popup interface.

## Problem

When clicking on Google Forms links while signed into multiple Google accounts, the form might open with the wrong account, causing permissions issues or data to be associated with an unintended account.

## Solution

This extension automatically intercepts Google Forms URLs and redirects them to include your selected account index (e.g., `/u/1/`, `/u/2/`) in the path. You can easily switch between different Google accounts and manage them through the extension's popup interface.

## Features

- **Multi-Account Support**: Manage multiple Google accounts with custom names
- **Easy Account Switching**: Click on any account in the popup to make it active
- **Automatic Page Reload**: When switching accounts on a Google Forms page, the page automatically reloads
- **Visual Feedback**: See which account is currently active with highlighting
- **Simple Setup**: Add accounts by providing a name and account index (u/0, u/1, u/2, etc.)
- **Automatic Redirection**: All Google Forms links automatically use your selected account
- **Smart Redirect Prevention**: Prevents infinite redirect loops when URLs already contain account information

## How it works

The extension modifies URLs from:
```
https://docs.google.com/forms/d/e/[FORM_ID]/viewform
```

To:
```
https://docs.google.com/forms/u/[SELECTED_INDEX]/d/e/[FORM_ID]/viewform
```

Where `[SELECTED_INDEX]` is the account you've chosen (0 for primary, 1 for secondary, etc.).

## Installation

### Chrome
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your toolbar

### Firefox
1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox"
4. Click "Load Temporary Add-on"
5. Select the `manifest.json` file from the extension folder

## Usage

### Adding Accounts
1. Click the extension icon in your browser toolbar
2. Enter a name for your account (e.g., "Work", "Personal", "School")
3. Enter the account index number (0 for primary, 1 for secondary, etc.)
4. Click "Add Account"

### Switching Accounts
1. Click the extension icon to open the popup
2. Click on any account name to make it active
3. The active account will be highlighted in blue
4. **If you're currently on a Google Forms page, it will automatically reload with the new account**
5. All future Google Forms links will use the selected account

### Finding Your Account Index
Your Google account index corresponds to the order you signed in:
- u/0 = First account you signed into
- u/1 = Second account you signed into  
- u/2 = Third account you signed into
- And so on...

## Files

- `manifest.json` - Extension configuration and permissions
- `background.js` - Main extension logic for URL redirection
- `popup.html` - Extension popup interface for account management
- `popup.js` - JavaScript logic for the popup interface
- `.gitignore` - Git ignore file for development

## Permissions

This extension requires:
- `storage` - To save your account preferences and settings
- `tabs` - To reload Google Forms pages when switching accounts
- `webRequest` - To intercept and modify web requests
- `webRequestBlocking` - To block and redirect requests
- `*://docs.google.com/forms/*` - Access to Google Forms URLs only

## Privacy

This extension only intercepts and modifies Google Forms URLs. Your account names and preferences are stored locally on your device. No personal data is collected, transmitted, or shared with external services.

## Version History

- **v1.3** - Added multi-account support with popup interface, automatic page reload on account switch, and smart redirect loop prevention
- **v1.0** - Initial release with basic u/0 redirection

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to submit issues and enhancement requests!
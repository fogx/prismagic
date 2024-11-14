# Prismagic - Prisma Studio UI Tweaks

[After being ghosted by Prisma for months](https://github.com/prisma/studio/issues/1267), I've taken matters into my own hands and built this browser extension. Maybe some day it will be fixed and this can be deprecated, but until then, enjoy!

Prismagic is a browser extension that enhances the Prisma Studio interface by repositioning the filter button for easier access. It detects Prisma Studio instances and applies UI improvements to make your database management experience more efficient.

## Features

- Repositions the filter controls
- Configurable URL patterns to control where the extension is active - preset to the localhost instance and any URL containing "prisma"
- Supports both exact URL matching and regex patterns

## Installation

### Chrome/Edge

1. Install manually:
   - Clone this repository
   - rename manifest.chrome.json to manifest.json
   - Open Chrome/Edge and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the extension directory
2. Download the latest release from the Chrome Web Store (coming never, costs money)

### Firefox

1. Install manually:
   - Clone this repository
   - Open Firefox Developer Edition
   - Navigate to `about:config`
   - Set `xpinstall.signatures.required` to `false`
   - Navigate to `about:addons`
   - Click the gear icon in the top right and select `Install Add-on From File...`
   - Select the zip file from the extension directory
2. Download the latest release from Firefox Add-ons (coming maybe)

## Configuration

1. Click the extension icon in your browser toolbar
2. Add URL patterns where you want Prismagic to be active:
   - Simple mode: Enter exact URLs (e.g., `http://localhost:5555`)
   - Regex mode: Use patterns to match multiple URLs (e.g., `.*prisma.*`)
3. Click "Save Changes" to apply your settings

By default, Prismagic is configured to work with:

- Any URL containing "prisma" (regex mode)
- `localhost:5555` (simple mode)

## Tests

To run the tests:

```bash
npm install
npm test
```

## TODOs

- confirm closing with enter and cancel with escape
  move the + button to the left
- Get a firefox signature
- ?

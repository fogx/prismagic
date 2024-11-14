const browser = globalThis.browser || chrome;

const defaultUrls = [
  {
    pattern: ".*prisma.*",
    isRegex: true,
  },
  {
    pattern: "localhost:5555",
    isRegex: false,
  },
];

// Listen for extension installation
browser.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    browser.storage.sync.set({ urls: defaultUrls }, () => {});
  }
});

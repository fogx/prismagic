export const testCases = [
  {
    description: "should return false when no URLs are stored (exact)",
    currentUrl: "https://example.com",
    storedUrls: [],
    expectedResult: false,
  },
  {
    description: "should match URLs correctly (exact)",
    currentUrl: "https://example.com",
    storedUrls: [{ pattern: "https://example.com", isRegex: false }],
    expectedResult: true,
  },
  {
    description: "should match patterns correctly (regex)",
    currentUrl: "https://example.com",
    storedUrls: [{ pattern: "example\\.com", isRegex: true }],
    expectedResult: true,
  },
  {
    description: "should handle invalid patterns (regex)",
    currentUrl: "https://example.com",
    storedUrls: [{ pattern: "[invalid regex", isRegex: true }],
    expectedResult: false,
    expectedError: ["Invalid regex pattern:", "[invalid regex"],
  },
  {
    description: "should not match non-matching URLs (exact)",
    currentUrl: "https://example.com",
    storedUrls: [{ pattern: "https://different.com", isRegex: false }],
    expectedResult: false,
  },
  {
    description: "should not match non-matching patterns (regex)",
    currentUrl: "https://example.com",
    storedUrls: [{ pattern: "different\\.com", isRegex: true }],
    expectedResult: false,
  },
  {
    description: "should match when one of multiple patterns matches (exact)",
    currentUrl: "https://example.com",
    storedUrls: [
      { pattern: "https://different.com", isRegex: false },
      { pattern: "https://example.com", isRegex: false },
    ],
    expectedResult: true,
  },
  {
    description: "should match when one of multiple patterns matches (regex)",
    currentUrl: "https://example.com",
    storedUrls: [
      { pattern: "different\\.com", isRegex: true },
      { pattern: "example\\.com", isRegex: true },
    ],
    expectedResult: true,
  },
  {
    description: "should handle mixed patterns correctly (mixed)",
    currentUrl: "https://example.com",
    storedUrls: [
      { pattern: "https://different.com", isRegex: false },
      { pattern: "example\\.com", isRegex: true },
    ],
    expectedResult: true,
  },
  {
    description: "should handle multiple invalid patterns (regex)",
    currentUrl: "https://example.com",
    storedUrls: [
      { pattern: "[invalid regex 1", isRegex: true },
      { pattern: "[invalid regex 2", isRegex: true },
    ],
    expectedResult: false,
    expectedError: ["Invalid regex pattern:", "[invalid regex 1"],
  },
];

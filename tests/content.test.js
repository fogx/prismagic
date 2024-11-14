import { checkIfShouldRun } from "../content";
import { testCases } from "./content.test.config";

const mockUrl = "https://example.com";
const mockBrowserAPI = {
  storage: {
    sync: {
      get: jest.fn(),
    },
  },
};

const originalConsoleError = console.error;

describe.each([
  [
    "Chrome",
    () => {
      window.chrome = mockBrowserAPI;
      window.browser = undefined;
    },
  ],
  [
    "Firefox",
    () => {
      window.browser = mockBrowserAPI;
      window.chrome = undefined;
    },
  ],
])("checkIfShouldRun - %s", (browserName, setupBrowser) => {
  beforeEach(() => {
    // Set up browser environment
    setupBrowser();
    // Reset mocks before each test
    mockBrowserAPI.storage.sync.get.mockReset();
    console.error = jest.fn();
    // Set up window.location
    delete window.location;
    window.location = new URL(mockUrl);
  });

  afterAll(() => {
    console.error = originalConsoleError;
  });

  // loop over test cases
  testCases.forEach(
    ({
      description,
      currentUrl,
      storedUrls,
      expectedResult,
      expectedError,
    }) => {
      test(description, async () => {
        // Set up the current URL
        window.location = new URL(currentUrl);

        // make sure our test cases are also URLs
        const normalizedUrls = storedUrls.map((urlData) => ({
          ...urlData,
          pattern: urlData.isRegex
            ? urlData.pattern
            : new URL(urlData.pattern).href,
        }));
        // Mock the storage response
        mockBrowserAPI.storage.sync.get.mockImplementation((key, callback) => {
          callback({ urls: normalizedUrls });
        });

        const result = await checkIfShouldRun();
        expect(result).toBe(expectedResult);

        if (expectedError) {
          expect(console.error).toHaveBeenCalledWith(...expectedError);
        }
      });
    }
  );
});

const checkIfShouldRun = async () => {
  const browserAPI = window.chrome || globalThis.browser;
  if (!browserAPI) {
    return false;
  }

  return new Promise((resolve) => {
    browserAPI.storage.sync.get("urls", (data) => {
      if (!data?.urls?.length) {
        resolve(false);
        return;
      }

      const currentUrl = window.location.href;
      const shouldRun = data.urls.some((urlData) => {
        if (!urlData.isRegex) {
          return currentUrl === urlData.pattern;
        } else {
          try {
            const regex = new RegExp(urlData.pattern);
            return regex.test(currentUrl);
          } catch (e) {
            console.error("Invalid regex pattern:", urlData.pattern);
            return false;
          }
        }
      });
      resolve(shouldRun);
    });
  });
};

const initialize = async () => {
  const shouldRun = await checkIfShouldRun();
  if (!shouldRun) {
    applyCustomStyles(false);
    return;
  }
  applyCustomStyles(true);
};

function applyCustomStyles(enabled) {
  document.documentElement.classList.toggle("prismagic", enabled);
}

if (document.documentElement) {
  initialize();
}

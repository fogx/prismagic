const browser = globalThis.browser || chrome;
const storage = browser.storage.sync;

document.addEventListener("DOMContentLoaded", () => {
  loadUrls();

  document.getElementById("add-url").addEventListener("click", addUrlEntry);
  document.getElementById("save").addEventListener("click", saveUrls);
});

function createUrlEntry(value = "", isRegex = false) {
  const entry = document.createElement("div");
  entry.className = "url-entry";

  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.placeholder = "Enter URL pattern";

  const modeLabel = document.createElement("span");
  modeLabel.className = "mode-label";
  modeLabel.textContent = isRegex ? "Regex" : "Simple";

  const switchLabel = document.createElement("label");
  switchLabel.className = "switch";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isRegex;
  checkbox.addEventListener("change", () => {
    modeLabel.textContent = checkbox.checked ? "Regex" : "Simple";
  });

  const sliderSpan = document.createElement("span");
  sliderSpan.className = "slider round";

  const removeButton = document.createElement("button");
  removeButton.textContent = "remove";
  removeButton.className = "remove";
  removeButton.addEventListener("click", () => {
    entry.remove();
    saveUrls();
  });

  switchLabel.appendChild(checkbox);
  switchLabel.appendChild(sliderSpan);

  entry.appendChild(input);
  entry.appendChild(modeLabel);
  entry.appendChild(switchLabel);
  entry.appendChild(removeButton);

  return entry;
}

function addUrlEntry() {
  saveUrls();
  const urlList = document.getElementById("url-list");
  urlList.appendChild(createUrlEntry());
}

function loadUrls() {
  storage.get("urls", (data) => {
    const urlList = document.getElementById("url-list");
    urlList.innerHTML = ""; // Clear existing entries

    if (data.urls && data.urls.length) {
      data.urls.forEach((urlData) => {
        const value = typeof urlData === "object" ? urlData.pattern : urlData;
        const isRegex = typeof urlData === "object" ? urlData.isRegex : false;
        urlList.appendChild(createUrlEntry(value, isRegex));
      });
    } else {
      addUrlEntry(); // Add one empty entry by default
    }
  });
}

function saveUrls() {
  const entries = document.querySelectorAll(".url-entry");
  const urls = Array.from(entries)
    .map((entry) => {
      const input = entry.querySelector("input");
      const isRegex = entry.querySelector(".switch input").checked;
      const value = input.value.trim();

      if (!value) return null;

      return {
        pattern: value,
        isRegex: isRegex,
      };
    })
    .filter((url) => url);

  // Validate patterns based on type
  try {
    urls.forEach((urlData) => {
      if (urlData.isRegex) {
        new RegExp(urlData.pattern);
      } else {
        new URL(urlData.pattern).href;
      }
    });
  } catch (e) {
    const status = document.getElementById("status");
    status.textContent = `Error: Invalid ${
      e instanceof TypeError ? "URL" : "regex pattern"
    } - ${e.message}`;
    setTimeout(() => (status.textContent = ""), 5000);
    return;
  }

  // Save the URLs to storage
  storage.set({ urls: urls }, () => {
    const status = document.getElementById("status");
    status.textContent = "Settings saved.";
    setTimeout(() => (status.textContent = ""), 2000);
  });
}

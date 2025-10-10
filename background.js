let activeIndex = 0;
let activeName = "Default";

// Load saved settings
browser.storage.local.get(["activeIndex", "activeName"]).then(res => {
  if (res.activeIndex !== undefined) activeIndex = res.activeIndex;
  if (res.activeName !== undefined) activeName = res.activeName;
  updateTooltip();
});

function updateTooltip() {
  browser.browserAction.setTitle({
    title: `Active: ${activeName} (u/${activeIndex})`
  });
}

// Redirect Google Forms URLs
browser.webRequest.onBeforeRequest.addListener(
  details => {
    const oldPart = "/forms/d/e/";
    const newPart = `/forms/u/${activeIndex}/d/e/`;
    if (details.url.includes(oldPart)) {
      const newUrl = details.url.replace(oldPart, newPart);
      return { redirectUrl: newUrl };
    }
  },
  { urls: ["*://docs.google.com/forms/*"] },
  ["blocking"]
);

// Listen for messages from popup when user switches account
browser.runtime.onMessage.addListener(message => {
  if (message.type === "setActiveAccount") {
    activeIndex = message.index;
    activeName = message.name;
    browser.storage.local.set({ activeIndex, activeName });
    updateTooltip();
  }
});

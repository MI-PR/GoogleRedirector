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
    const url = details.url;
    
    // Check if URL already has the correct account index
    const currentAccountMatch = url.match(/\/forms\/u\/(\d+)\/d\/e\//);
    if (currentAccountMatch) {
      const currentIndex = parseInt(currentAccountMatch[1]);
      // Skip if it's already the correct account
      if (currentIndex === activeIndex) {
        return;
      }
      // Replace with the active account index
      const newUrl = url.replace(/\/forms\/u\/\d+\/d\/e\//, `/forms/u/${activeIndex}/d/e/`);
      return { redirectUrl: newUrl };
    }
    
    // Handle URLs without account index (add the active account)
    const oldPart = "/forms/d/e/";
    if (url.includes(oldPart)) {
      const newUrl = url.replace(oldPart, `/forms/u/${activeIndex}/d/e/`);
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

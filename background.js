let activeIndex = 0;

// Load saved active account index
browser.storage.local.get("activeIndex").then(res => {
  if (res.activeIndex !== undefined) activeIndex = res.activeIndex;
});

// Listen for redirect
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

// Listen for popup messages (when user changes account)
browser.runtime.onMessage.addListener(message => {
  if (message.type === "setActiveIndex") {
    activeIndex = message.index;
    browser.storage.local.set({ activeIndex });
  }
});

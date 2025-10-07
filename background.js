browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    const oldPart = "/forms/d/e/";
    const newPart = "/forms/u/0/d/e/";

    if (details.url.includes(oldPart)) {
      const newUrl = details.url.replace(oldPart, newPart);
      return { redirectUrl: newUrl };
    }
  },
  { urls: ["*://docs.google.com/forms/*"] },
  ["blocking"]
);

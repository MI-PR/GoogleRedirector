const list = document.getElementById("list");
const addBtn = document.getElementById("add");
const nameInput = document.getElementById("name");
const indexInput = document.getElementById("index");

// Load saved accounts
function loadAccounts() {
  browser.storage.local.get(["accounts", "activeIndex"]).then(res => {
    list.innerHTML = "";
    const accounts = res.accounts || [];
    const active = res.activeIndex ?? 0;

    accounts.forEach(acc => {
      const div = document.createElement("div");
      div.className = "account";
      div.textContent = `${acc.name} (u/${acc.index})`;
      if (acc.index === active) div.style.background = "#d0eaff";
      div.onclick = () => {
        browser.runtime.sendMessage({ type: "setActiveIndex", index: acc.index });
        browser.storage.local.set({ activeIndex: acc.index });
        loadAccounts();
      };
      list.appendChild(div);
    });
  });
}

loadAccounts();

addBtn.onclick = () => {
  const name = nameInput.value.trim();
  const index = parseInt(indexInput.value);

  if (!name || isNaN(index)) {
    alert("Please enter a valid name and index (number).");
    return;
  }

  browser.storage.local.get("accounts").then(res => {
    const accounts = res.accounts || [];
    accounts.push({ name, index });
    browser.storage.local.set({ accounts }).then(() => {
      nameInput.value = "";
      indexInput.value = "";
      loadAccounts();
    });
  });
};

const addGhostCss = async (tabId) => {
  await chrome.scripting.insertCSS({
    files: ["ghost.css"],
    target: { tabId },
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#DA0037",
    tabId
  });
}

const removeGhostCss = async (tabId) => {
  await chrome.scripting.removeCSS({
    files: ["ghost.css"],
    target: { tabId },
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#171717",
    tabId
  });
}
chrome.action.onClicked.addListener(async (tab) => {
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  if ( nextState == 'ON') {
    await addGhostCss(tab.id)
  }
  else {
    await removeGhostCss(tab.id)
  }
  chrome.action.setBadgeText({text: nextState , tabId: tab.id });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF"
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#171717"
  });
});
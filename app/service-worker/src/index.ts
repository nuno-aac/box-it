/**
 * `handleReload` function
 */

const handleReload = (id: number, info: any) => {
  if(info.status ==='loading') {
    chrome.storage.local.remove(`${id}Css`);
  }
}

/**
 * `handleRemove` function
 */

const handleRemove = (id: number) => {
  chrome.storage.local.remove(`${id}Css`);
}

/**
 * Add the listeners
 */

chrome.tabs.onRemoved.addListener(handleRemove);
chrome.tabs.onUpdated.addListener(handleReload);
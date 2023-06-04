/**
 * Module dependencies
 */

import { useEffect, useState } from 'react';

/**
 * Export `useCurrentTab` hook;
 */

const useCurrentTab = () => {
  const [currentTabId, setCurrentTabId] = useState<number>();

  useEffect(() => {
    const handleTabChange = (activeInfo: chrome.tabs.TabActiveInfo) => {
      setCurrentTabId(activeInfo?.tabId);
    };

    // Add event listener for tab changes
    chrome.tabs.onActivated.addListener(handleTabChange);

    // Get the currently active tab initially
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length > 0 && tabs[0].id) {
        setCurrentTabId(tabs[0].id);
      }
    });

    // Clean up the event listener when component unmounts
    return () => {
      chrome.tabs.onActivated.removeListener(handleTabChange);
    };
  }, []);

  return currentTabId;
};

export default useCurrentTab;

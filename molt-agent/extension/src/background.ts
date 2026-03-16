/**
 * Molt Agent — Background Service Worker
 *
 * Handles extension lifecycle. The actual agent communication
 * happens in the content script — this file manages install/update
 * events and badge state.
 */

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Molt] Extension installed');
});

// Relay messages from content scripts if needed in future
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'MOLT_STATUS') {
    sendResponse({ status: 'active' });
  }
  return true;
});

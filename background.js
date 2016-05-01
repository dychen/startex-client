var SERVER_URL = 'http://127.0.0.1:3000/'

var socket = io(SERVER_URL);
/* Handle server broadcasts */
// Bid is bought
socket.on('sfx-bid-buy-res', function(data){
  console.log('[DEBUG] Receiving completed buy: ', data);
  // Send to all tabs
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, {
        title: 'sfx-bid-buy-res',
        bidId: data.id
      });
    });
  });
});
// Bid is posted
socket.on('sfx-bid-sell-res', function(data){
  console.log('[DEBUG] Receiving completed sell: ', data);
  // Send to all tabs
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, {
        title: 'sfx-bid-sell-res',
        bid: data
      });
    });
  });
});

/*
 * Listen for data from trader.js
 *
 * @param request [Object]: Contains the data necessary to perform the action
 *                          associated with the message.
 * @param sender [Object]: The original message sender.
 * @param sendResponse [function]: Function that takes as an argument the data
 *                                 to send back to the caller.
 */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.title === 'sfx-bid-buy-req') {
    console.log('[DEBUG] Sending buy order: ', request.bid, request.user);
    socket.emit('sfx-bid-buy-req', { bid: request.bid, user: request.user });
  }
  if (request.title === 'sfx-bid-sell-req') {
    console.log('[DEBUG] Sending sell order: ', request.bid, request.user);
    socket.emit('sfx-bid-sell-req', { bid: request.bid, user: request.user });
  }
});

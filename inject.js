var traderWidget = document.createElement('iframe');
traderWidget.id = 'startex-widget-inject';
traderWidget.src = chrome.extension.getURL('trader.html');
document.body.appendChild(traderWidget);

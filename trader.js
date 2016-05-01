$(document).ready(function() {
  var USER = 'daniel@a16z.com'; // TODO

  var TraderViewModel = function() {
    var self = this;
    self.minimized = ko.observable(false);
    self.bids = ko.observableArray([
      {
        id: 1,
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 2,
        company: 'Pinterest',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 3,
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 4,
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 5,
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 6,
        company: 'Pinterest',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 7,
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        id: 8,
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
    ]);

    self.sellBid = {
      company: ko.observable(''),
      shares: ko.observable(0),
      price: ko.observable(0)
    }

    self.toggleMinimize = function() {
      self.minimized(!self.minimized());
    }

    self.minimizeCSS = ko.pureComputed(function() {
      return self.minimized() ? 'minimized' : 'notmin';
    });

    /*
     * @param bid:
     * {
     *   id: 12345,
     *   company: 'TestCo',
     *   shares: 200,
     *   price: 5,
     *   issuer: 'TestUser',
     * }
     */
    self.buy = function(bid) {
      console.log(bid);
      chrome.runtime.sendMessage({
        title: 'sfx-bid-buy-req',
        bid: bid,
        user: USER
      });
    }

    self.sell = function() {
      /* TODO: Validations */
      console.log(self.sellBid);
      chrome.runtime.sendMessage({
        title: 'sfx-bid-sell-req',
        bid: {
          company: self.sellBid.company(),
          shares: self.sellBid.shares(),
          price: self.sellBid.price()
        },
        user: USER
      });
      self.sellBid.company(null);
      self.sellBid.shares(null);
      self.sellBid.price(null);
    }

    self.removeBid = function(bidId) {
      self.bids.remove(function(bid) { return bid.id === bidId; });
    }

    self.addBid = function(bid) {
      self.bids.unshift(bid);
    }
  }

  /* Bindings */
  var Trader = new TraderViewModel();
  ko.applyBindings(Trader);

  /*
   * Listen for data from backgroud.js
   *
   * @param request [Object]: Contains the data necessary to perform the action
   *                          associated with the message.
   * @param sender [Object]: The original message sender.
   * @param sendResponse [function]: Function that takes as an argument the data
   *                                 to send back to the caller.
   */
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.title === 'sfx-bid-buy-res') {
      console.log('Received completed buy', request);
      Trader.removeBid(request.bidId);
    }
    if (request.title === 'sfx-bid-sell-res') {
      console.log('Received completed sell', request);
      Trader.addBid(request.bid);
    }
  });
});


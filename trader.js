$(document).ready(function() {
  var TraderViewModel = function() {
    var self = this;
    self.minimized = ko.observable(false);
    self.bids = ko.observableArray([
      {
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Pinterest',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Airbnb',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Pinterest',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      },
      {
        company: 'Github',
        shares: 100,
        price: 10,
        issuer: 'daniel@a16z.com'
      }
    ]);

    self.toggleMinimize = function() {
      self.minimized(!self.minimized());
      console.log(self.minimized());
    }

    self.minimizeCSS = ko.pureComputed(function() {
      return self.minimized() ? 'minimized' : 'notmin';
    });
  }

  /* Bindings */
  ko.applyBindings(new TraderViewModel());
});


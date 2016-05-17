/*
 * CommonRegexJS
 * https://github.com/talyssonoc/commonregexjs
 *
 * Licensed under the MIT license.
 */

'use strict';

var expect = require('chai').expect;
var CommonRegex = require('../lib/commonregex');

describe('CommonRegex', function() {
  var commonRegex;

  beforeEach(function() {
    var text = 'John, please get that article on www.linkedin.com to me by 5:00PM\n'
              + 'on Jan 9th 2012. 4:00 would be ideal, actually. If you have any questions,\n'
              + 'you can reach my associate at (012)-345-6789 or associative@mail.com.\n'
              + 'I\'ll be in UK during the whole week at a J.R.R. Tolkien convention, starting friday at 7PM.';

    commonRegex = new CommonRegex(text);
  });

  describe('#dates', function() {
    it('should find dates', function() {
      expect(commonRegex.dates).to.eql(['Jan 9th 2012']);
    });
  });

  describe('#times', function(){
    it('should find times', function() {
      expect(commonRegex.times).to.eql(['5:00PM', '4:00', '7PM']);
    });
  });

  describe('#phones', function() {
    it('should find phone numbers', function() {
      expect(commonRegex.phones).to.eql(['(012)-345-6789']);
    });
  });

  describe('#links', function() {
    it('should find links', function() {
      expect(commonRegex.links).to.eql(['www.linkedin.com']);
    });
  });

  describe('#emails', function() {
    it('should find emails', function() {
      expect(commonRegex.emails).to.eql(['associative@mail.com']);
    });
  });

  describe('#IPv4', function() {
    it('should find IPv4 addresses', function() {
      expect(commonRegex.getIPv4('The IPv4 address for localhost is 127.0.0.1.'))
        .to.eql(['127.0.0.1']);
    });
  });

  describe('#IPv6', function() {
    it('should find IPv6 addresses', function() {
      expect(commonRegex.getIPv6('The IPv6 address for localhost is 0:0:0:0:0:0:0:1, or alternatively ::1, but not :1:.'))
        .to.eql(['0:0:0:0:0:0:0:1', '::1']);
      });
  });

  describe('#hexColors', function() {
    it('should find hex colors codes', function() {
      expect(commonRegex.getHexColors('Did you knew that Hacker News orange is #ff6600?')).to.eql(['#ff6600']);
    });
  });

  describe('#acronyms', function() {
    it('should find acronyms', function() {
      expect(commonRegex.getAcronyms()).to.eql(['UK', 'J.R.R.']);
    });
  });

  describe('#money', function() {
    it('should find money values', function() {
      var text = 'They said the price was US$5,000.90, actually it is US$3,900.5. It\'s $1100.4 less, can you imagine this?';

      var expected = ['US$5,000.90', 'US$3,900.5', '$1100.4'];

      expect(commonRegex.getMoney(text))
        .to.eql(expected);
      });
  });

  describe('#percentages', function() {
    it('should find percentages', function() {
      expect(commonRegex.getPercentages('I\'m 99.9999999% sure that I\'ll get a raise of 5%.'))
        .to.eql(['99.9999999%', '5%']);
    });
  });

  describe('#creditCards', function() {
    it('should find credit cards numbers', function() {
      var text = 'His credit card number can be writen as 1234567891011121 or 1234-5678-9101-1121, but not 123-4567891011121.';

      var expected = ['1234567891011121', '1234-5678-9101-1121'];

      expect(commonRegex.getCreditCards(text))
        .to.eql(expected);
      });
  });

  describe('#addresses', function() {
    it('should find addresses', function() {
      var text = 'checkout the new place at 101 main st., 504 parkwood drive, 3 elm boulevard, 500 elm street, 101 main straight';

      var expected = [
        '101 main st.',
        '504 parkwood drive',
        '3 elm boulevard',
        '500 elm street'
      ];

      expect(commonRegex.getAddresses(text)).to.eql(expected);
    });
  });
});

/*
 * CommonRegexJS
 * https://github.com/talyssonoc/commonregexjs
 *
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
chai.expect();
chai.should();

var expect = chai.expect;

var text = 'John, please get that article on www.linkedin.com to me by 5:00PM\n'
      + 'on Jan 9th 2012. 4:00 would be ideal, actually. If you have any questions,\n'
      + 'you can reach my associate at (012)-345-6789 or associative@mail.com.\n'
      + 'I\'ll be in UK during the whole week at a J.R.R. Tolkien convention.';

var CommonRegex = require('../lib/commonregex.js');
var commonRegex = new CommonRegex(text);

describe('CommonRegex module', function(){
  it('dates', function(){
    expect(commonRegex.dates).to.eql(['Jan 9th 2012']);
  });

  it('times', function(){
    expect(commonRegex.times).to.eql(['5:00PM', '4:00']);
  });

  it('phones', function(){
    expect(commonRegex.phones).to.eql(['(012)-345-6789']);
  });

  it('links', function(){
    expect(commonRegex.links).to.eql(['www.linkedin.com']);
  });

  it('emails', function(){
    expect(commonRegex.emails).to.eql(['associative@mail.com']);
  });

  it('IPv4', function(){
    expect(commonRegex.getIPv4('The IPv4 address for localhost is 127.0.0.1.')).to.eql(['127.0.0.1']);
  });

  it('IPv6', function(){
    expect(commonRegex.getIPv6('The IPv6 address for localhost is 0:0:0:0:0:0:0:1, or alternatively, ::1.'))
    .to.eql(['0:0:0:0:0:0:0:1', '::1']);
  });

  it('hex colors', function(){
    expect(commonRegex.getHexColors('Did you knew that Hacker News orange is #ff6600?')).to.eql(['#ff6600']);
  });

  it('acronyms', function(){
    expect(commonRegex.getAcronyms()).to.eql(['UK', 'J.R.R.']);
  });

  it('money', function(){
    expect(commonRegex.getMoney('They said the price was US$5,000.90, actually it is US$3,900.5. It\'s $1100.4 less, can you imagine this?'))
    .to.eql(['US$5,000.90', 'US$3,900.5', '$1100.4']);
  });

  it('percentage', function(){
    expect(commonRegex.getPercentages('I\'m 99.9999999% sure that I\'ll get a raise of 5%.'))
    .to.eql(['99.9999999%', '5%']);
  });
});

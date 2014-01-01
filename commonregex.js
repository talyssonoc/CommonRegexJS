(function(target) {
  var CommonRegex = function(_text) {
    this.text = _text || '';
    var _ = this;

    /**
     * TODO:
     *
     *  getIPv6
     *  getNumbersBetweenRange
     */

    var opt = function(regex) {
      return '(?:' + regex + ')?';
    }

    , group = function(regex) {
      return '(?:' + regex + ')';
    }

    , any = function(regexes) {
      return regexes.join('|');
    }

    , dateRegex = (function() {
      var monthRegex = '(?:jan\\.?|january|feb\\.?|february|mar\\.?|march|apr\\.?|april|may|jun\\.?|june|jul\\.?|july|aug\\.?|august|sep\\.?|september|oct\\.?|october|nov\\.?|november|dec\\.?|december)'
      , dayRegex = '[0-3]?\\d(?:st|nd|rd|th)?'
      , yearRegex = '\\d{4}';

      dateRegex = group(any([dayRegex + '\\s+(?:of\\s+)?' + monthRegex, monthRegex + '\\s+' + dayRegex])) + '(?:\\,)?\\s*' + opt(yearRegex) + '|[0-3]?\\d[-/][0-3]?\\d[-/]\\d{2,4}';

      return new RegExp(dateRegex, 'gim');
    }())

    , timeRegex = /((0?[0-9]|1[0-2]):[0-5][0-9](am|pm)|([01]?[0-9]|2[0-3]):[0-5][0-9])/gim
    , phoneRegex = /(\d?[^\s\w]*(?:\(?\d{3}\)?\W*)?\d{3}\W*\d{4})/gim
    , linksRegex = /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim
    , emailsRegex = /([a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+@([a-z0-9]+\.)+([a-z0-9]+))/gim
    , IPv4Regex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm
    , hexColorsRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/gim
    , acronymsRegex = /\b(([A-Z]\.)+|([A-Z]){2,})/gm
    , moneyRegex = /((^|\b)US?)?\$\s?[0-9]{1,3}((,[0-9]{3})+|([0-9]{3})+)?(\.[0-9]{1,2})?\b/gm
    , percentageRegex = /(100(\.0+)?|[0-9]{1,2}(\.[0-9]+)?)%/gm;

    /**
     * Used to get all the matches of a regex from a string
     * @param  {String} text  Text to look for the matches
     * @param  {Regexp} regex Regex to match the text
     * @return {Array}       Array of matches
     */
    var getMatches = function(text, regex) {
      text = text || _.text;
      var matches = text.match(regex);
      if(matches === null)
        return [];
      return matches;
    };

    this.getDates = function(_text) {
      return getMatches(_text, dateRegex);
    };

    this.getTimes = function(_text) {
      return getMatches(_text, timeRegex);
    };

    this.getPhones = function(_text) {
      return getMatches(_text, phoneRegex);
    };

    this.getLinks = function(_text) {
      return getMatches(_text, linksRegex);
    };

    this.getEmails = function(_text) {
      return getMatches(_text, emailsRegex);
    };

    this.getIPv4 = function(_text) {
      return getMatches(_text, IPv4Regex);
    };

    this.getHexColors = function(_text) {
      return getMatches(_text, hexColorsRegex);
    };

    this.getAcronyms = function(_text) {
      return getMatches(_text, acronymsRegex);
    };

    this.getMoney = function(_text) {
      return getMatches(_text, moneyRegex);
    };

    this.getPercentages = function(_text) {
      return getMatches(_text, percentageRegex);
    };

    if(!(_text === undefined)) {
      this.dates = this.getDates();
      this.times = this.getTimes();
      this.phones = this.getPhones();
      this.links = this.getLinks();
      this.emails = this.getEmails();
      this.IPv4 = this.getIPv4();
      this.hexColors = this.getHexColors();
      this.acronyms = this.getAcronyms();
      this.money = this.getMoney();
      this.percentages = this.getPercentages();
    }

    return this;
  };

  //Export as RequireJS module
  if (typeof target.define === 'function' && target.define.amd) {
    define(function() {
        return CommonRegex;
    });
  }
  else {
    target.CommonRegex = CommonRegex;
  }
  
}(window));
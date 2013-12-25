var CommonRegex = function(_text) {
  this.text = _text || '';

  /**
   * TODO:
   *
   *  getIPv6
   *  getNumbersBetweenRange
   */

  var opt = function(regex) {
    return '(?:' + regex + ')?';
  };

  var group = function(regex) {
    return '(?:' + regex + ')';
  };

  var any = function(regexes) {
    return regexes.join('|');
  };

  this.getDates = function(_text) {
    _text = _text || this.text;
    var monthRegex = '(?:jan\\.?|january|feb\\.?|february|mar\\.?|march|apr\\.?|april|may|jun\\.?|june|jul\\.?|july|aug\\.?|august|sep\\.?|september|oct\\.?|october|nov\\.?|november|dec\\.?|december)';
    // var dayRegex = '(?<!\\:)(?<!\\:\\d)[0-3]?\\d(?:st|nd|rd|th)?'; Any alternative for lookbehind in JavaScript ?
    var dayRegex = '[0-3]?\\d(?:st|nd|rd|th)?';
    var yearRegex = '\\d{4}';

    var dateRegex = group(any([dayRegex + '\\s+(?:of\\s+)?' + monthRegex, monthRegex + '\\s+' + dayRegex])) + '(?:\\,)?\\s*' + opt(yearRegex) + '|[0-3]?\\d[-/][0-3]?\\d[-/]\\d{2,4}';

    dateRegex = new RegExp(dateRegex, 'gim');

    return _text.match(dateRegex);
  };

  this.getTimes = function(_text) {
    _text = _text || this.text;
    var timeRegex = /((0?[0-9]|1[0-2]):[0-5][0-9](am|pm)|([01]?[0-9]|2[0-3]):[0-5][0-9])/gim;
    return _text.match(timeRegex);
  };

  this.getPhones = function(_text) {
    _text = _text || this.text;
    var phoneRegex = /(\d?[^\s\w]*(?:\(?\d{3}\)?\W*)?\d{3}\W*\d{4})/gim;
    return _text.match(phoneRegex);
  };

  this.getLinks = function(_text) {
    _text = _text || this.text;
    var linksRegex = /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim;
    return _text.match(linksRegex);
  };

  this.getEmails = function(_text) {
    _text = _text || this.text;
    var emailsRegex = /([a-z0-9!#$%&'*+\/=?^_`{|}~-]+@([a-z0-9]+\.)+([a-z0-9]+))/gim;
    return _text.match(emailsRegex);
  };

  this.getIPv4 = function(_text) {
    _text = _text || this.text;
    var IPv4Regex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm;
    return _text.match(IPv4Regex);
  };

  this.getHexColors = function(_text) {
    _text = _text || this.text;
    var hexValuesRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/gim;
    return _text.match(hexValuesRegex)
  };

  this.getAcronyms = function(_text) {
    _text = _text || this.text;
    var acronymsRegex = /\b(([A-Z]\.)+|([A-Z]){2,})/gm;
    return _text.match(acronymsRegex);
  };

  this.getMoney = function(_text) {
    _text = _text || this.text;
    var moneyRegex = /((^|\b)U)?\$\s?[0-9]{1,3}((,[0-9]{3})+|([0-9]{3})+)?(\.[0-9]{1,2})?\b/gm;
    return _text.match(moneyRegex);
  };

  if(typeof _text !== 'undefined') {
    this.dates = this.getDates();
    this.times = this.getTimes();
    this.phones = this.getPhones();
    this.links = this.getLinks();
    this.emails = this.getEmails();
    this.IPv4 = this.getIPv4();
    this.hexColors = this.getHexColors();
    this.acronyms = this.getAcronyms();
    this.money = this.getMoney();
  }

  return this;

};
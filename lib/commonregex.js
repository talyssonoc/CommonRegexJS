(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory();
	} else {
		// Browser globals
		root.CommonRegex = factory();
	}
}(this, function() {
	var CommonRegex = function(_text) {
		this.text = _text || '';

		if (_text !== undefined) {
			// Uses lazy evaluation

			regexesNames.forEach(function(r) {
				Object.defineProperty(this, r, {
					get: function() {
						var propertyName = '_' + r;

						if(!this[propertyName]) {
							this[propertyName] = this.getMatches(this.text, regexes[r]);
						}

						return this[propertyName];
					}
				});
			}.bind(this));
		}
	};

	var regexes = {

		dates: (function() {
			var opt = function opt(regex) {
				return '(?:' + regex + ')?';
			},

			group = function group(regex) {
				return '(?:' + regex + ')';
			},

			any = function any(regexes) {
				return regexes.join('|');
			};

			var monthRegex = '(?:jan\\.?|january|feb\\.?|february|mar\\.?|march|apr\\.?|april|may|jun\\.?|june|jul\\.?|july|aug\\.?|august|sep\\.?|september|oct\\.?|october|nov\\.?|november|dec\\.?|december)',
			dayRegex = '[0-3]?\\d(?:st|nd|rd|th)?',
			yearRegex = '\\d{4}';

			var datesRegex = group(any([dayRegex + '\\s+(?:of\\s+)?' + monthRegex, monthRegex + '\\s+' + dayRegex])) + '(?:\\,)?\\s*' + opt(yearRegex) + '|[0-3]?\\d[-/][0-3]?\\d[-/]\\d{2,4}';

			return new RegExp(datesRegex, 'gim');
		}()),

		times: /((0?[0-9]|1[0-2]):[0-5][0-9](am|pm)|([01]?[0-9]|2[0-3]):[0-5][0-9])/gim,

		phones: /(\d?[^\s\w]*(?:\(?\d{3}\)?\W*)?\d{3}\W*\d{4})/gim,

		links: /((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))/gim,

		emails: /([a-z0-9!#$%&'*+\/=?\^_`{|}~\-]+@([a-z0-9]+\.)+([a-z0-9]+))/gim,

		IPv4: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/gm,

		IPv6: /((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))\b/gim,

		hexColors: /#(?:[0-9a-fA-F]{3}){1,2}\b/gim,

		acronyms: /\b(([A-Z]\.)+|([A-Z]){2,})/gm,

		money: /((^|\b)US?)?\$\s?[0-9]{1,3}((,[0-9]{3})+|([0-9]{3})+)?(\.[0-9]{1,2})?\b/gm,

		percentages: /(100(\.0+)?|[0-9]{1,2}(\.[0-9]+)?)%/gm,

		creditCards: /((?:(?:\d{4}[- ]){3}\d{4}|\d{16}))(?![\d])/gm,

		addresses: /\d{1,4} [\w\s]{1,20}(?:(street|avenue|road|highway|square|trail|drive|court|parkway|boulevard|circle)\b|(st|ave|rd|hwy|sq|trl|dr|ct|pkwy|blvd|cir)\.(?=\b)?)/gim
	};

	var regexesNames = Object.keys(regexes);

	/**
		* Used to get all the matches of a regex from a string
		* @param  {String} text  Text to look for the matches
		* @param  {Regexp} regex Regex to match the text
		* @return {Array}       Array of matches
		*/
	CommonRegex.prototype.getMatches = function getMatches(text, regex) {
		text = text || this.text;
		var matches = text.match(regex);
		if (matches === null) {
			return [];
		}
		return matches;
	};

	var capitalize = function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	// Add a method relative to each one of the regexes
	Object.keys(regexes).forEach(function(r) {
		CommonRegex.prototype['get' + capitalize(r)] = function(_text) {
			if(_text) {
				return this.getMatches(_text, regexes[r]);
			}

			return this[r];
		};
	});

	return CommonRegex;

}));
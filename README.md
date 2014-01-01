CommonRegexJS
=============

[CommonRegex](https://github.com/madisonmay/CommonRegex/ "CommonRegex") port for JavaScript

Find a lot of kinds of common information in a string.

Pull requests welcome!

Please note that this is currently English/US specific.

Usage
=====

You can use CommonRegexJS normally, using a script tag:

    <script type="text/javascript" src="commonregex.js"></script>

Or import it with RequireJS, putting `commonregex.js` file inside your RequireJS base directory, using like this:

    requirejs(['commonregex'], function(CommonRegex) {
        //Use CommonRegex normally here
    }

API
===

You can instantiate a CommonRegex object passing a string in the constructor and use the fields of the object to acess the matches and the methods for the matches of other strings (passing the string as parameter), or not pass a string in the constructor and just use the methods.

Possible fields and its equivalent methods:

* `dates` or `getDates([text])`
* `times` or `getTimes([text])`
* `phones` or `getPhones([text])`
* `links` or `getLinks([text])`
* `emails` or `getEmails([text])`
* `IPv4` or `getIPv4([text])`
* `hexColors` or `getHexColors([text])`
* `acronyms` or `getAcronyms([text])`
* `money` or `getMoney([text])`
* `percentages` or `getPercentages([text])` (matches percentages between 0.00% and 100.00%)

Examples
========

    var text = 'John, please get that article on www.linkedin.com to me by 5:00PM\n'
    + 'on Jan 9th 2012. 4:00 would be ideal, actually. If you have any questions,\n'
    + 'you can reach my associate at (012)-345-6789 or associative@mail.com.\n'
    + 'I\'ll be on UK during the whole week on a J.R.R. Tolkien convention.';
    
    var commonRegex = new CommonRegex(text);
    console.log(commonRegex.dates);
    //logs ["Jan 9th 2012"]
    console.log(commonRegex.times);
    //logs ["5:00PM", "4:00"]
    console.log(commonRegex.phones);
    //logs ["(012)-345-6789"]
    console.log(commonRegex.links);
    //logs ["www.linkedin.com"]
    console.log(commonRegex.emails);
    //logs ["associative@mail.com"]
    console.log(commonRegex.getAcronyms());
    //logs ["UK", "J.R.R."]

Alternatively, you can generate a single CommonRegex instance and use it to parse multiple segments of text.

    var commonRegex = new CommonRegex();
    console.log(commonRegex.times('When are you free? Do you want to meet up for coffee at 4:00?''));
    //logs ["4:00"]
    console.log(commonRegex.getMoney('They said the price was US$5,000.90, actually it is US$3,900.5. It\'s $1100.4 less, can you imagine this?'));
    //logs ["US$5,000.90", "US$3,900.5", "$1100.4"]
    console.log(commonRegex.getPercentages('I\'m 99.9999999% sure that I\'ll get a raise of 5%.'));
    //logs ["99.9999999%", "5%"] 
    
For a pratical example, see the `index.html` file.


CommonRegex Ports
=================
There are CommonRegex ports for other languages, see [here](https://github.com/madisonmay/CommonRegex/#commonregex-ports "CommonRegex ports")
CommonRegexJS
=============

[CommonRegex](https://github.com/madisonmay/CommonRegex/ "CommonRegex") port for JavaScript

Find all times, dates, links, phone numbers, emails, IPs, hexadecimal colors and acronyms in a string. 
I did the hard work so you don't have to.

Pull requests welcome!

Please note that this is currently English/US specific.

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
    console.log(commonRegex.times('When are you free?  Do you want to meet up for coffee at 4:00?''));
    //logs ["4:00"]
    
For a pratical example, see the `index.html` file.

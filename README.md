CommonRegexJS
=============

[CommonRegex](https://github.com/madisonmay/CommonRegex/ "CommonRegex") port for JavaScript

Find all times, dates, links, phone numbers, and emails in a string. 
I did the hard work so you don't have to.

Pull requests welcome!

Usage
------

    var text = 'John, please get that article on www.linkedin.com to me by 5:00PM\n'
    + 'on Jan 9th 2012. 4:00 would be ideal, actually. If you have any \n'
    + 'questions, You can reach me at (012)-345-6789 or get in touch with\n'
    + 'my associate at my-email@gmail.com';
    
    var commonRegex = new CommonRegex(text);
    console.log(commonRegex.dates);
    //logs ["Jan 9th 2012"]
    console.log(commonRegex.times);
    //logs ["5:00", "4:00"]
    console.log(commonRegex.phones);
    //logs ["(012)-345-6789"]
    console.log(commonRegex.links);
    //logs ["www.linkedin.com"]
    console.log(commonRegex.emails);
    //logs ["my-email@gmail.com"]

Alternatively, you can generate a single CommonRegex instance and use it to parse multiple segments of text.

    var parser = CommonRegex();
    console.log(parser.times("When are you free?  Do you want to meet up for coffee at 4:00?"));
    //logs ['4:00']

Please note that this is currently English/US specific.


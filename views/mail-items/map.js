function(doc) {
    function f(n) {    // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    };
    
    function rfc3339(date) {
      return date.getUTCFullYear()   + '-' +
        f(date.getUTCMonth() + 1) + '-' +
        f(date.getUTCDate())      + 'T' +
        f(date.getUTCHours())     + ':' +
        f(date.getUTCMinutes())   + ':' +
        f(date.getUTCSeconds())   + 'Z';
    };

    if(doc.headers) {

        var bytype = {};
        for(var i in doc.parts) {
            var typetoks = doc.parts[i].contentType.split(';');
            bytype[typetoks[0]] = doc.parts[i];
        }

        var excerpt = '';
        if(bytype['text/plain'])
        {
            excerpt = bytype['text/plain'].content.substring(0,150);
        }

        emit([rfc3339(new Date(doc.headers["Date"]))], {
                     subject: doc.subject,
                     from: doc.from,
                     excerpt: excerpt,
                     attachments: doc._attachments
        });

    }
}

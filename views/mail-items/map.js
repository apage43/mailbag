function(doc) {
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
        var bags = doc.bags;
        if(!bags) {
            bags = ["all-mail"];
        } else {
            bags.push("all-mail");
        }
        for(var b in bags)
        emit([bags[b], new Date(doc.headers["Date"])], {
                     subject: doc.subject,
                     from: doc.from,
                     excerpt: excerpt,
                     attachments: doc._attachments
        });
    }
}

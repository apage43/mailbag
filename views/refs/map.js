function (doc) {
    emit(doc.messageID, 1);
    if(doc.headers["References"])
    {
    //    emit(doc.headers["References"], null);
        var refheader = doc.headers["References"];
        var refs = refheader.replace(/\r/g,"").replace(/ /g,"").split("\n");
        for(var i in refs)
        {
            emit(refs[i], 1);
        }
    }
}

var express = require('express');
var ipfs = require('wb-ipfs');
var app = express();

app.get('/', function (req, res) {
    let ip = "192.168.1.20";
    let ipfsConnection = new ipfs.IpfsConnection(ip);
    let hash = "QmcxAke8tG6cNJiZCqQoZvTE2yDoJu95VJ9KSQKYdkgcCm"
    //Exemple lectura
    res.setHeader('Content-Type', 'text/html');
    ipfsConnection.read(hash).then(links => {
        console.log(links);
        links.forEach((item, i) => {
            res.write(`<img src=${item}></img></br>`);
        });
        res.end();
    }).catch(err => {
            console.log('Got error from IPFSread', err);
    });

    //Exemple escriptura (funciona unicament si hi ha un node IPFS a localhost)
    /*let path = "";
    ipfs.IPFSwrite(ip,path).then(ret => {
        console.log(ret);
    }).catch(err => {
        console.log(err)
    });*/
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

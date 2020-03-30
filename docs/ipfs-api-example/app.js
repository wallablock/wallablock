var express = require('express');
var ipfs = require('wb-ipfs')
var app = express();

app.get('/', function (req, res) {
    let ip = "79.147.40.189";
    let hash = "QmP71gMJGWYtfRGRejq8ciNQkrrNTJA4mWZaaMstEL5fmR";
    res.setHeader('Content-Type', 'text/html');
    ipfs.IPFSread(ip,hash).then(links => {
        console.log(links);
        links.forEach((item, i) => {
            res.write(`<img src=${item}></img>`);
        });
        res.end();
    }).catch(err => {
            console.log('Got error from IPFSread', err);
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

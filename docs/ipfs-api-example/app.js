var express = require('express');
var ipfs = require('wb-ipfs')
var app = express();

app.get('/', function (req, res) {
    let ip = "79.147.40.189";
    let hash = "QmeqSB7T8bMGN84127daUtCouYEHRggEbnbMwcbnN5XiwQ";
    res.setHeader('Content-Type', 'text/html');
    ipfs.IPFSread(ip,hash).then(links => {
        console.log(links);
        links.forEach((item, i) => {
            res.write(`<img src=${item}></img></br>`);
        });
        res.end();
    }).catch(err => {
            console.log('Got error from IPFSread', err);
    });
    /*let path = "";
    let res = await ipfs.IPFSwrite(ip,path);
    console.log(res);*/
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

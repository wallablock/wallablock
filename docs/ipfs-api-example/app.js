var express = require("express");
var ipfs = require("wb-ipfs");
// With ES2015 imports, the following is recommended:
// import { IpfsConnection } from "wb-ipfs";

const ipfsNodeIp = "127.0.0.1:3000";

let app = express();

let ipfsConnection = new ipfs.IpfsConnection(ipfsNodeIp);
const hash = "Qmd57pfbufqvXHwfDKbXkow8TGJFLL49ugbcxn5DxTo7ac";

app.get("/readCover", async function(_req, res, next) {
    let link;
    try {
        link = await ipfsConnection.coverUrl(hash);
    } catch (err) {
        console.error("Error from readCover:", err);
        return next(`Error: ${err}`);
    }
    console.log(link);
    res.setHeader("Content-Type", "text/html");
    res.write(`<img src=${link}></img><br />`);
    res.end();
});

app.get("/read", async function(_req, res, next) {
    // Read Example
    let links;
    try {
        links = await ipfsConnection.read(hash);
    } catch (err) {
        console.error("Error from IPFS.read:", err);
        // Passes error to Express so it can return it with a 500 Server Error status
        return next(`Error: ${err}`);
    }
    res.setHeader("Content-Type", "text/html");
    for (let item of links) {
        res.write(`<img src=${item}></img><br />`);
    }
    res.end();
});

app.get("/write", async function(_req, res, next) {
    // Write example. Only if IPFS is at localhost
    const path = "";
    let ret;
    try {
        ret = await ipfsConnection.write(path);
    } catch (err) {
        console.error("Error from IPFS.write:", err);
        return next(`Error: ${err}`);
    }
    res.setHeader("Content-Type", "text/html");
    res.send(ret);
    res.end();
    ipfsConnection.write(path);
});

app.listen(3030, function () {
    console.log('Example app listening on port 3030!');
});

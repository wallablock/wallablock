var express = require("express");
var ipfs = require("wb-ipfs");
// With ES2015 imports, the following is recommended:
// import { IpfsConnection } from "wb-ipfs";

const ipfsNodeIp = "http://192.168.1.20:3000";

let app = express();

let ipfsConnection = new ipfs.IpfsConnection(ipfsNodeIp);
const hash = "QmPwn2M19Li41k6v8r4WnERiiPFLw93mceGaafMbSjduF8";

app.get("/readCover", async function (_req, res, next) {
  let link;
  try {
    link = await ipfsConnection.coverUrl(hash);
  } catch (err) {
    console.error("Error from readCover:", err);
    return next(`Error: ${err}`);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<img src=${link}></img><br />`);
  res.end();
});

app.get("/readDesc", async function (_req, res, next) {
  let desc;
  try {
    desc = await ipfsConnection.fetchDesc(hash);
  } catch (err) {
    console.error("Error from fetchCover:", err);
    return next(`Error: ${err}`);
  }
  res.setHeader("Content-Type", "text/html");
  res.write(`<p1>${desc}</p1>`);
  res.end();
});

app.get("/readImages", async function (_req, res, next) {
  // Read Example
  let links;
  try {
    links = await ipfsConnection.getAllImagesUrl(hash);
  } catch (err) {
    console.error("Error from getAllImagesUrl:", err);
    // Passes error to Express so it can return it with a 500 Server Error status
    return next(`Error: ${err}`);
  }
  res.setHeader("Content-Type", "text/html");
  for (let item of links) {
    res.write(`<img src=${item}></img><br />`);
  }
  res.end();
});

app.get("/write", async function (_req, res, next) {
  console.log("funciona");
  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
        <body>
        <form action="${ipfsNodeIp}/wb/upload" method="post" enctype="multipart/form-data">
          <input type="file" id="files" name="files" multiple><br><br>
          <input type="submit">
        </form>
        </body>
        </html>`);
  res.end();
});

app.listen(3030, function () {
  console.log("Example app listening on port 3030!");
});

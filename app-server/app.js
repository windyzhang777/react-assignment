const express = require("express");
const path = require("path");
const port = 4200;
const app = express();

app.get("/getTransactions", (_, res) => {
  res.sendFile(path.join(__dirname, "/transactions.json"));
});

app.listen(port, (err) => {
  if (err) {
    console.log(`err :`, err);
  } else
    [console.log(`server running on localhost:${port}`)];
});

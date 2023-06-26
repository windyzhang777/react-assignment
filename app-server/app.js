require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

app.get("/getTransactions", (_, res) => {
  res.sendFile(path.join(__dirname, "/transactions.json"));
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`err :`, err);
  } else
    [
      console.log(
        `listening on localhost:${process.env.PORT}`
      ),
    ];
});

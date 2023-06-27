require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = express.Router();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const getTransaction = (_, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, "/transaction.json"));
};
router.get("/", getTransaction);
app.use("/api/transaction", router);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(`err :`, err);
  } else {
    console.log(
      `listening on localhost:${process.env.PORT}`
    );
  }
});

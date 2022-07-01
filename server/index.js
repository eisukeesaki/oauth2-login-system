const express = require("express");
const app = express();

const port = process.env.PORT || 4242;

app.get("/", (req, res) => {
  res.send("you have just made a GET request to /");
});

app.listen(port, () => {
  console.log("server is listening to port ", port);
});


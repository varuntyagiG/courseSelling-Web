const express = require("express");
const adminRouter = require("./routes/admin1");
const userRouter = require("./routes/user1");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hey!");
});

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(4002);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const departments = require("./routes/departments");
const clients = require("./routes/clients");
const employees = require("./routes/employees");
const user = require("./routes/register");
const auth = require("./routes/login");
const path = require("path");
const noticeBoard = require("./routes/noticeBoard");

mongoose
  .connect(config.get("mongooseKey"))
  .then(console.log("Connected to MONGODB"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/departments", departments);
app.use("/api/clients", clients);
app.use("/api/employees", employees);
app.use("/api/auth/user", user);
app.use("/api/auth/login", auth);
app.use("/api/noticeBoard", noticeBoard);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

const express = require("express");
const session = require('express-session')
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require('passport')

const router = require("./network/routes");
const PORT = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "DSU",
    reavase: true,
    // saveUnitialized: true
    saveUninitialized: true,
  })
);

app.use(passport.initialize())
app.use(passport.session())

router(app);

app.get("/", (req, res) => {
  res.send("Assigment 3 - Angel Higueros");
});

app.get("/api", (req, res) => {
  res.send("Api V.1.0.0");
});

server.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});

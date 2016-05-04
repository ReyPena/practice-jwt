var express = require("express")
  , mongoose = require("mongoose")
  , bodyParser = require("body-parser");

var User = require("./models/User.js")
  , jwt = require("./services/jwt.js");

var app = express();

app.use(bodyParser.json());

// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// user registration api
app.post("/register", function (req, res) {
  var user = req.body;

  var newUser = new User.model ({
    email: user.email,
    password: user.password
  });

  // create the jwt function
  var payload = {
    iss: req.hostname,
    sub: newUser.id
  };
  // variable that hold the token in the payload
  var token = jwt.encode(payload, "shhh...");

  newUser.save(function (err) {
    res.status(200).send({
      user: newUser.toJSON(),
      token: token
    });
  });
});

var jobs = [
  "Cook",
  "Super Hero",
  "Unicorn Wisperer",
  "Toast Inspector"
];

app.get("/jobs", function (req, res) {
  // this will check if the header contains the token
  if(!req.headers.authorization){
    return res.status(401).send({message: "You are not authorized"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, "shhh...");

  if(!playload.sub){
    res.status(401).send({message: "Authentication failed"});
  }

  res.json(jobs);
});

mongoose.connect("mongodb://localhost/jwt");

var server = app.listen(3000, function () {
  console.log("api listening on ", server.address().port);
});

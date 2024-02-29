const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
// remember to add dotenv file where we will going to store SecretKey
let SecretKey = "1rwtwttffw";

app.get("/", (req, res) => {
  res.json({ message: "hello this is nikhil" });
});

app.post("/login", (req, res) => {
  let User = { id: 1, email: "nikhil@gmail.com", password: "123" };

  console.log("user>", User);
  jwt.sign({ User }, SecretKey, { expiresIn: "3000s" }, (err, token) => {
    res.json({ token });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, SecretKey, (err, authData) => {
    if (err) {
      res.send({ result: "invalid token" });
    } else {
      res.send({ message: "profile accessed", authData });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    let bearer = bearerHeader.split(" ");
    let token = bearer[1];
    req.token = token;
    next();
    console.log(token); //this is for checking is token is generating or not
  } else {
    res.send({
      result: "token is not valid",
    });
  }
}

app.listen(3000, () => {
  console.log("server is listening on " + 3000);
});

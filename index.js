const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "secret";

const port = 1000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  const user = {
    id: 1,
    name: "Deepak",
    email: "deepak@gmail.com",
  };
  jwt.sign({ user }, secretkey, { expiresIn: "3000s" }, (err, token) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating token");
    } else {
      res.send(token);
    }
  });
});

app.post("/validate", token, (req, res) => {
 jwt.verify(req.token, secretkey, function(err, decoded){
   if(err){
     res.status(403).send('Invalid Token');
   }else{
     console.log(JSON.stringify(decoded.user));
     res.status(200).send(`Valid Token ${JSON.stringify(decoded)}`);
   }
 })
})
function token(req, res, next) {
      const header = req.headers['authorization'];

  if (header) {
    const bearer = header.split(" ");
    if (bearer[0] === "Bearer") {
      req.token = bearer[1];
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(401);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

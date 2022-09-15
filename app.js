const express = require("express");
const router = require("./routes/router");
const session = require('express-session')

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// Middleware Login
app.use(
  session({
    secret: 'fjRIGIPP3w', //SECRET KEY
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, //use true if https (production)
      sameSite: true //use true for csrf security
    }, 
  })
)

app.use(router);

app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});

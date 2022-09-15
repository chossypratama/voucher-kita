const express = require("express");
const auth = require("./routes/auth");
const product = require("./routes/product");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(auth);
app.use(product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

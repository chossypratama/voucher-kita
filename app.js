const express = require("express");
const user = require("./routes/user");
const product = require("./routes/product");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(user);
app.use(product);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
require("./Database/DB");
app.use(cookieParser());
app.use(express.json());
app.use(require("./Routes/route"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Listening..`);
});

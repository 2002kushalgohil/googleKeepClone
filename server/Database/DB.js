const mongoose = require("mongoose");
const DB =
  process.env.DB ||
  "mongodb+srv://kushal:127001@googlekeepclone.zhogd.mongodb.net/Users?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection SuccessFull");
  })
  .catch((err) => {
    console.log("Connection Failed");
  });

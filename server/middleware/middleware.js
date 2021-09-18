const User = require("../Model/userSchema");
const jwt = require("jsonwebtoken");
const middleware = async (req, res, next) => {
  try {
    const data = jwt.verify(req.cookies.jwt, "secretkeyforjwt");
    const _id = data._id;

    const userData = await User.findById({ _id });
    req.userData = userData;

    if (userData == null) {
      return res.status(400).send("No User Found");
    }

    next();
  } catch (err) {
    res.status(400).send("No User Found");
    next();
  }
};

module.exports = middleware;

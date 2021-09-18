const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Enter User Name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter Password"],
  },
  confirmPassword: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  notes: [
    {
      title: {
        type: String,
      },
      note: {
        type: String,
      },
      color: {
        type: String,
      },
    },
  ],
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 10);
    this.confirmPassword = undefined;
  }
});

UserSchema.methods.authToken = async function () {
  const token = await jwt.sign({ _id: this._id }, "secretkeyforjwt");
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};


const User = new mongoose.model("userdata", UserSchema);

module.exports = User;

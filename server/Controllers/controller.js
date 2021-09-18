const User = require("../Model/userSchema");
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    if (!email || !password || !confirmPassword) {
      return res.status(401).send("Fill All The Details");
    }

    if (password === confirmPassword) {
      const verify = await User.findOne({ email });

      if (verify) {
        return res.status(400).send("Email Already Exsist");
      } else {
        const newUser = new User({ email, password, confirmPassword });
        const token = await newUser.authToken();
        res.cookie("jwt", token);

        await newUser.save();
        res.status(201).send("Registration Done");
      }
    } else {
      return res.status(403).send("Password Does Not match");
    }
  } catch (error) {
    res.status(400).send("Something is Wrong in Regiatration");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(401).send("Fill All The Details");
    }

    const verify = await User.findOne({ email });

    if (verify) {
      const passwordVerify = await bcryptjs.compare(password, verify.password);

      if (passwordVerify) {
        const token = await verify.authToken();
        res.cookie("jwt", token);
        res.status(200).send("login Successfull");
      } else {
        return res.status(400).send("Invalid Credientials");
      }
    } else {
      return res.status(400).send("Invalid Credientials");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const logout = async (req, res) => {
  try {
    req.userData.tokens = req.userData.tokens.filter((elem) => {
      return elem.token != req.cookies.jwt;
    });

    res.clearCookie("jwt");
    await req.userData.save();
    res.status(200).send("Logout successfull");

  } catch (err) {
    res.status(400).send("Something is Wrong in Logout");
  }
};

const create = async (req, res) => {
  const { title, note, color } = req.body;
  try {
    if (!title || !note || !color) {
      return res.status(401).send("Fill All The Details");
    }
    const userData = req.userData;
    userData.notes = userData.notes.concat({ title, note, color });
    await userData.save();
    res.status(201).send("Data Inserted");
  } catch (err) {
    res.status(400).send("Something went wrong In Create");
  }
};

const read = async (req, res) => {
  try {

    const userNotes = req.userData.notes;
    res.status(200).send(userNotes);
    
  } catch (err) {
    res.status(400).send("Something went wrong in Read");
  }
};

const find = async (req, res) => {
  try {
    const _id = req.params.id;
    const userNotes = req.userData.notes;

    const note = userNotes.filter((items) => {
      return items._id == _id;
    });

    res.status(201).send(note);
  } catch (err) {
    res.status(400).send("Something went wrong in Find");
  }
};

const update = async (req, res) => {
  try {
    let _id = req.params.id;
    let userData = req.userData;

    const objIndex = userData.notes.findIndex((obj) => obj._id == _id);
    userData.notes[objIndex] = req.body;

    await userData.save();

    res.status(201).send("Data Updated");
  } catch (error) {
    
    res.status(400).send("Something went wrong in Update");
  }
};

const deleteData = async (req, res) => {
  try {
    const _id = req.params.id;
    const userData = req.userData;
    req.userData.notes = req.userData.notes.filter((elem) => {
      return elem._id != _id;
    });

    await userData.save();
    res.status(200).send("Data Deleted");
  } catch (err) {
    
    res.status(400).send("Something went wrong in Delete");
  }
};

module.exports = {
  register,
  login,
  create,
  read,
  find,
  update,
  deleteData,
  logout,
};

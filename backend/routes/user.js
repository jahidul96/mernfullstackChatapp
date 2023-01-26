const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "hey ,i m route auth!!",
  });
});

// register a user

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hasedPassword = await bcrypt.hash(password, 10);
  req.body.password = hasedPassword;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(200).json({
        message: "already exists this user!!",
      });
    }

    const user = new User(req.body);
    const savedUser = await user.save();

    savedUser.password = undefined;

    res.status(200).json({
      message: "user Created succesfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user signin or not not
    const userExist = await User.findOne({ email });
    if (userExist) {
      // check user password
      const comparedPass = await bcrypt.compare(password, userExist.password);
      // password match login succesfull response
      userExist.password = undefined;
      if (comparedPass) {
        res.status(200).json({
          message: "Login succesfull",
          user: userExist,
          succes: true,
        });
      }
      // password not match response
      else {
        res.status(202).json({
          succes: false,
          message: "wrong creadential's",
        });
      }
    }
    //  user not found with this email response
    else {
      res.status(202).json({
        succes: false,
        message: "wrong creadential's",
      });
    }
  } catch (error) {
    // server error response for now!!
    res.json({
      succes: false,
      message: "something went wrong!!",
    });
  }
});
module.exports = router;

const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const authMiddleWare = require("../middleware/auth");

router.get("/", async (req, res) => {
  const users = await User.find();
  try {
    res.send(users);
  } catch (err) {
    res.send(err);
  }
});

router.get("/me", authMiddleWare, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  let newUser = await User.findOne({ email: req.body.email });
  if (newUser)
    return res.status(400).send(`An account with this email already exists`);

  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  try {
    const token = user.generateAuthToken();

    const newUser = await user.save();
    res.status(200).header("x-auth-token", token).send(newUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

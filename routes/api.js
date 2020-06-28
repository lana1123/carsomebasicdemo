const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const Slot = require("../models/Slot");
const User = require("../models/User");
const UserSession = require("../models/UserSession");

//Token signature
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "Lana",
      sub: userID,
    },
    "Lana",
    { expiresIn: "1h" }
  );
};

//User registration
router.post("/registration", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res
        .status(400)
        .json({ message: { msgBody: "Email already exists", msgError: true } });
    else {
      const newUser = new User({ username, password });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Account successfully registered",
              msgError: false,
            },
          });
      });
    }
  });
});

//User login
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: { username } });
    } else {
      res.json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    }
  }
);

//User logout
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
  }
);

//User session persist
router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

//Get all users
router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//Gets all available slots
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const slot = await Slot.find();
      res.json(slot);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//Book a slot (add a slot in Slot db and update User db)
//add slot in Slot db
router.post(
  "/bookSlot",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const slot = new Slot({
      slot_datetime: req.body.slot_datetime,
    });
    try {
      const submitSlot = await slot.save();
      res.json(submitSlot);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//update User db
router.post(
  "/updateUser/:username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { slot_datetime } = req.body;

    User.findOneAndUpdate(
      { username: req.params.username },
      { slot_datetime: slot_datetime },
      (err, user) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(201).json({
            message: {
              msgBody: "Slot successfully booked for user",
              msgError: false,
            },
          });
      }
    );
  }
);

//Check slot for that user
router.get(
  "/userSlot/:username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const checkUserSlot = await User.find({
        username: req.params.username,
      });
      res.json(checkUserSlot);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

//Check specific slot
router.get(
  "/:slotTime",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const checkSlot = await Slot.find({ slot_datetime: req.params.slotTime });
      res.json(checkSlot);
    } catch (err) {
      res.json({ message: err });
    }
  }
);

module.exports = router;

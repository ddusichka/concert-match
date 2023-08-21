const express = require("express");
const {
  getUser,
  getUserInterests,
  signUp,
  logIn,
  react,
} = require("../controllers/userController");

const router = express.Router();

// GET an individual user
router.get("/:id", getUser);

// GET an individual user's interests
router.get("/:id/interests", getUserInterests);

// POST a new user
router.post("/signup", signUp);

// POST a user logging in
router.post("/login", logIn);

// POST a user's reaction
router.post("/react", react);

module.exports = router;

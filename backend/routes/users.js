const express = require("express");
const {
  signUp,
  getUsers,
  logIn,
  // addGroup,
  swipe,
  getUserInterests,
} = require("../controllers/userController");

const router = express.Router();

// GET all concerts in the US
router.get("/", getUsers);

// GET a single workout
// router.get("/:id", getWorkout);

// POST a new user
router.post("/signup", signUp);

// POST a user logging in
router.post("/login", logIn);

// router.post("/group", addGroup);

router.post("/react", swipe);

router.get("/:id/interests", getUserInterests);

// DELETE a workout
// router.delete("/:id", deleteWorkout);

// UPDATE a workout
// router.patch("/:id", updateWorkout);

module.exports = router;

const express = require("express");
const { createGroup, addUser } = require("../controllers/groupController");

const router = express.Router();

// POST a new group
router.post("/create", createGroup);

// POST a new user to a group
router.post("/add", addUser);

module.exports = router;

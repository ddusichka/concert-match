const express = require("express");
const { getConcerts } = require("../controllers/concertController");

const router = express.Router();

// GET all concerts in the US
router.get("/", getConcerts);

module.exports = router;

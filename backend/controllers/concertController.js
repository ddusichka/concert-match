const { response } = require("express");
const concertService = require("../services/concertService");

// This file is for defining routes

// GET all concerts
const getConcerts = async (req, res) => {
  try {
    const concerts = await concertService.getConcerts();
    res.status(200).json(concerts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getConcerts,
};

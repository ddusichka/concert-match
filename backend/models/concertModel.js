const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const concertSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    event_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    imageURL: {
      type: String,
      required: true,
    },
    localDate: {
      type: Date,
      required: true,
    },
    // localTime: {
    //   type: Date,
    //   required: true,
    // },
    genre: {
      type: String,
    },
    subgenre: {
      type: String,
    },
    minPrice: {
      type: Number,
    },
    maxPrice: {
      type: Number,
    },
    venue: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Concert", concertSchema);

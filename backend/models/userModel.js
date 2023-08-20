const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    picURL: {
      type: String,
    },
    matches: {
      type: [String],
    },
    seenConcerts: {
      type: [Schema.Types.ObjectId],
      ref: "Concert",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

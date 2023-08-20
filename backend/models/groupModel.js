const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);

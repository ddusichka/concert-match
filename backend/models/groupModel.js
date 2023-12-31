const mongoose = require("mongoose");
const shortid = require("shortid");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);

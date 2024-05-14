const mongoose = require("mongoose");

const streamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

const Streams = mongoose.model("Streams", streamSchema);

module.exports = { Streams };

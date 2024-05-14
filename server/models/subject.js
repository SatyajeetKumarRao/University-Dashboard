const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Streams",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Subjects = mongoose.model("Subjects", subjectSchema);

module.exports = { Subjects };

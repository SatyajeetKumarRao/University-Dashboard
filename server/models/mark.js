const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema(
  {
    studentName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Streams",
      required: true,
    },
    subjects: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
      required: true,
    },
    marks: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const Marks = mongoose.model("Marks", marksSchema);

module.exports = { Marks };

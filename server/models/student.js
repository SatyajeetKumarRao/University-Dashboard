const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user"] },
    stream: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Streams",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Students = mongoose.model("Students", studentSchema);
module.exports = { Students };

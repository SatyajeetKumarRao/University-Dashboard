const express = require("express");
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/users.middleware");
const { Subjects } = require("../models/subject");

const subjectRouter = express.Router();

subjectRouter.post(
  "/add",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { subject, stream } = req.body;
      const newSubject = new Subjects({ name: subject, stream: stream });
      await newSubject.save();
      return res
        .status(201)
        .json({ message: "New subject added successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

subjectRouter.get("/", async (req, res) => {
  try {
    const data = await Subjects.find().populate("stream");
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

subjectRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Subjects.findById(id);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

subjectRouter.get("/stream/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Subjects.aggregate([{ $match: { stream: id } }]);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

subjectRouter.patch(
  "/update/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const { subject, stream } = req.body;

      const data = await Subjects.findByIdAndUpdate(id, {
        name: subject,
        stream: stream,
      });

      return res.status(200).json({ message: "Subject updated successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

subjectRouter.delete(
  "/delete/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Subjects.findByIdAndDelete(id);

      return res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

subjectRouter.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { subjectRouter };

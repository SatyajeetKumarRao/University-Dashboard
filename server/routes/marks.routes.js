const express = require("express");
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/users.middleware");
const { Marks } = require("../models/mark");

const marksRouter = express.Router();

marksRouter.post(
  "/add",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { studentName, stream, subjects, marks } = req.body;
      const newMarks = new Marks({ studentName, stream, subjects, marks });
      await newMarks.save();
      return res.status(201).json({ message: "New Marks added successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);
marksRouter.get(
  "/",
  authenticateUser,
  authorizeUser("admin", "user"),
  async (req, res) => {
    try {
      const id = req.userId;

      if (req.role === "admin") {
        const data = await Marks.find()
          .populate({
            path: "studentName",
            select: "-password",
          })
          .populate("stream")
          .populate("subjects");
        return res.status(200).json({ data: data });
      } else {
        console.log(id);
        const data = await Marks.find({ studentName: id })
          .populate({
            path: "studentName",
            select: "-password",
          })
          .populate("stream")
          .populate({
            path: "subjects",
            select: "-stream",
          });
        return res.status(200).json({ data: data });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

marksRouter.patch(
  "/update/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { studentName, stream, subjects, marks } = req.body;
      const data = await Marks.findByIdAndUpdate(id, {
        studentName,
        stream,
        subjects,
        marks,
      });

      return res.status(200).json({ message: "Marks updated successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

marksRouter.delete(
  "/delete/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Marks.findByIdAndDelete(id);
      return res.status(200).json({ message: "Marks deleted successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

marksRouter.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { marksRouter };

const express = require("express");
const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/users.middleware");
const { Streams } = require("../models/stream");

const streamsRouter = express.Router();

streamsRouter.post(
  "/add",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { name } = req.body;

      const newStream = new Streams({ name: name });

      await newStream.save();
      return res.status(201).json({ message: "New stream added successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);
streamsRouter.get("/", async (req, res) => {
  try {
    const data = await Streams.find();
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

streamsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Streams.findById(id);
    return res.status(200).json({ data: data });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: true, message: error.message });
  }
});

streamsRouter.patch(
  "/update/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const data = await Streams.findByIdAndUpdate(id, { name: name });

      return res.status(200).json({ message: "Stream updated successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

streamsRouter.delete(
  "/delete/:id",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Streams.findByIdAndDelete(id);

      return res.status(200).json({ message: "Stream deleted successfully" });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ error: true, message: error.message });
    }
  }
);

streamsRouter.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { streamsRouter };

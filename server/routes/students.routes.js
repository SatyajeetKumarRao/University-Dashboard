const express = require("express");

const {
  validateLogin,
  validateRegister,
  authenticateUser,
  authorizeUser,
} = require("../middleware/users.middleware");
const {
  studentLogin,
  studentRegister,
} = require("../controller/students.controller");
const { Students } = require("../models/student");
const { Marks } = require("../models/mark");
const { BlacklistToken } = require("../models/blacklistToken");

const studentsRouter = express.Router();

studentsRouter.post("/login", validateLogin, studentLogin);
studentsRouter.post("/register", validateRegister, studentRegister);

studentsRouter.get(
  "/studentList",
  authenticateUser,
  authorizeUser("admin"),
  async (req, res) => {
    try {
      const data = await Students.find(
        { role: "user" },
        { password: 0, role: 0 }
      )
        .populate("stream")
        .populate("subject");
      return res.status(200).json({ data: data });
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: true, message: error.message });
    }
  }
);

studentsRouter.get(
  "/profile/:id",
  authenticateUser,
  authorizeUser("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (req.role === "admin" || (req.role == "user" && req.userId == id)) {
        const data = await Students.find({ _id: id }, { password: 0, role: 0 })
          .populate("stream")
          .populate("subject");
        return res.status(200).json({ data: data });
      } else {
        return res.status(400).json({
          error: true,
          message: "You are not allowed to access this user",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: true, message: error.message });
    }
  }
);

studentsRouter.get(
  "/performance/:id",
  authenticateUser,
  authorizeUser("admin", "user"),
  async (req, res) => {
    try {
      const { id } = req.params;

      if (req.role === "admin" || (req.role == "user" && req.userId == id)) {
        const data = await Marks.find({ studentName: id })
          .populate("stream")
          .populate("subjects");

        return res.status(200).json({ data: data });
      } else {
        return res.status(400).json({
          error: true,
          message: "You are not allowed to access this user",
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: true, message: error.message });
    }
  }
);

studentsRouter.post("/logout", async (req, res) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] == "Bearer"
    ) {
      const accessToken = req.headers.authorization.split(" ")[1];

      const blacklistToken = new BlacklistToken({ token: accessToken });

      await blacklistToken.save();

      return res.status(200).json({
        message: "User logged out successfully",
      });
    } else {
      return res
        .status(400)
        .json({ error: true, message: "Access Token Required" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: true, message: error.message });
  }
});

studentsRouter.all("*", (req, res) => {
  return res.status(404).json({ message: "404 Invalid Route" });
});

module.exports = { studentsRouter };

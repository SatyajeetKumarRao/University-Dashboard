require("dotenv");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { Students } = require("../models/student");

const saltRounds = 10;

const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Students.findOne({ email });

    if (!student) {
      return res
        .status(404)
        .json({ error: true, message: "User doesn't exist. Try to register." });
    }

    bcrypt.compare(password, student.password, (err, result) => {
      if (err) {
        throw new Error(err);
      }

      if (result) {
        const accessToken = jwt.sign(
          {
            userId: student._id,
            email: student.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        return res.status(200).json({
          accessToken,
          data: {
            userId: student._id,
            email: student.email,
            role: student.role,
          },
          message: "User logged in successfully",
        });
      } else {
        return res
          .status(400)
          .json({ error: true, message: "Invalid email or password" });
      }
    });
  } catch (error) {
    console.log(error.message);

    return res.status(400).json({ error: true, message: error.message });
  }
};

const studentRegister = async (req, res) => {
  try {
    const { name, email, password, stream, subject } = req.body;

    const studentExist = await Students.findOne({ email });

    if (studentExist) {
      return res
        .status(400)
        .json({ error: true, message: "Student already exists" });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        throw new Error(err);
      }

      const student = new Students({
        name,
        email,
        stream,
        subject,
        password: hash,
      });

      await student.save();

      return res.status(200).json({
        error: false,
        data: {
          _id: student._id,
          email: student.email,
        },
        message: "New Student has been registered",
      });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ error: true, message: error.message });
  }
};

module.exports = {
  studentLogin,
  studentRegister,
};

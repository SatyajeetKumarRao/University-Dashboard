const jwt = require("jsonwebtoken");
const { Students } = require("../models/student");

const validateRegister = (req, res, next) => {
  const { name, email, password, stream, subject } = req.body;

  if (name && stream && subject && email && password) {
    next();
  } else {
    return res.status(400).json({
      error: true,
      message:
        "Some fields are missing [name, email, password, stream, subject] all are required.",
    });
  }
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email && password) {
    next();
  } else {
    return res.status(400).json({
      error: true,
      message: "Some fields are missing, all are required.",
    });
  }
};

const authenticateUser = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] == "Bearer"
  ) {
    const accessToken = req.headers.authorization.split(" ")[1];

    try {
      var decodedData = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET
      );

      if (decodedData) {
        const { userId } = decodedData;

        const user = await Students.findById(userId);

        if (user) {
          req.role = user.role;
          req.userId = userId;
          next();
        } else {
          return res.status(400).json({
            error: true,
            message: "Invalid Access Token. User does not exist",
          });
        }
      } else {
        return res
          .status(400)
          .json({ error: true, message: "Invalid Access Token" });
      }
    } catch (err) {
      res.status(401).json({ error: true, message: err.message });
    }
  } else {
    return res
      .status(400)
      .json({ error: true, message: "Access Token Required" });
  }
};

const authorizeUser = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.role)) {
      next();
    } else {
      return res.status(400).json({
        error: true,
        message: "User not authorized to access this route",
      });
    }
  };
};

module.exports = {
  validateRegister,
  validateLogin,
  authenticateUser,
  authorizeUser,
};

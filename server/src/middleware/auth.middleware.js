const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      const error = new Error(
        "Authentication required"
      );

      error.statusCode = 401;

      throw error;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      error.statusCode = 401;
      error.message = "Invalid or expired session";
    }

    next(error);
  }
};

const requireOwner = (req, res, next) => {
  if (!req.user || req.user.role !== "OWNER") {
    const error = new Error(
      "Owner access required"
    );

    error.statusCode = 403;

    return next(error);
  }

  next();
};

module.exports = {
  requireAuth,
  requireOwner,
};
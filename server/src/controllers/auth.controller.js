const {
    login,
  } = require("../services/auth.service");
  
  const loginUser = async (req, res, next) => {
    try {
      const {
        email,
        password,
      } = req.body;
  
      if (!email || !password) {
        const error = new Error(
          "Email and password are required"
        );
  
        error.statusCode = 400;
  
        throw error;
      }
  
      const result = await login(
        email,
        password
      );
  
      res.cookie(
        "access_token",
        result.token,
        {
          httpOnly: true,
          secure:
            process.env.NODE_ENV === "production",
          sameSite:
            process.env.NODE_ENV === "production"
              ? "none"
              : "lax",
          maxAge:
            24 * 60 * 60 * 1000,
        }
      );
  
      res.status(200).json({
        success: true,
  
        data: {
          user: result.user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  const getCurrentUser = async (
    req,
    res,
    next
  ) => {
    try {
      res.status(200).json({
        success: true,
  
        data: {
          user: req.user,
        },
      });
    } catch (error) {
      next(error);
    }
  };
  
  const logoutUser = async (
    req,
    res,
    next
  ) => {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure:
          process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production"
            ? "none"
            : "lax",
      });
  
      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = {
    loginUser,
    getCurrentUser,
    logoutUser,
  };
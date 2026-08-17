const express = require("express");

const {
  loginUser,
  getCurrentUser,
  logoutUser,
} = require("../controllers/auth.controller");

const {
  requireAuth,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", loginUser);

router.get(
  "/me",
  requireAuth,
  getCurrentUser
);

router.post(
  "/logout",
  requireAuth,
  logoutUser
);

module.exports = router;
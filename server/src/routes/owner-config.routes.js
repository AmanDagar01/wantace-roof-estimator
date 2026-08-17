const express = require("express");

const {
  getOwnerConfiguration,
  updateConfiguration,
} = require("../controllers/owner-config.controller");

const {
  requireAuth,
  requireOwner,
} = require("../middleware/auth.middleware");

const router = express.Router();

router.use(
  requireAuth,
  requireOwner
);

router.get(
  "/",
  getOwnerConfiguration
);

router.put(
  "/",
  updateConfiguration
);

module.exports = router;
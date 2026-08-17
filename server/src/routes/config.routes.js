const express = require("express");

const {
  getPublicConfiguration,
} = require("../controllers/config.controller");

const router = express.Router();

router.get("/", getPublicConfiguration);

module.exports = router;
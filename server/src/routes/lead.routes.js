const express = require("express");

const {
  submitLead,
} = require("../controllers/lead.controller");

const router = express.Router();

router.post("/", submitLead);

module.exports = router;
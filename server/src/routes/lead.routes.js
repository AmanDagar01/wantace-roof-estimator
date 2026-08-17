const express = require("express");

const {
  submitLead,
  getOwnerLeads,
} = require("../controllers/lead.controller");

const {
  requireAuth,
  requireOwner,
} = require("../middleware/auth.middleware");

const router = express.Router();

/*
 * Public
 */
router.post("/", submitLead);

/*
 * Owner only
 */
router.get(
  "/owner",
  requireAuth,
  requireOwner,
  getOwnerLeads
);

module.exports = router;
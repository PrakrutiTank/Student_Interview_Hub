const express = require("express");
const Opportunity = require("../models/Opportunity");
const auth = require("../middleware/Auth");

const router = express.Router();

// Admin adds opportunity
router.post("/add", auth, async (req, res) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  const opp = await Opportunity.create(req.body);
  res.json(opp);
});

// Everyone views
router.get("/", async (req, res) => {
  const opps = await Opportunity.find();
  res.json(opps);
});

module.exports = router;

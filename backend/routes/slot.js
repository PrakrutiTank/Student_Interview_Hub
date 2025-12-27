const express = require("express");
const Slot = require("../models/Slot");
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

const router = express.Router();

// Executive creates slot
router.post("/create", auth, async (req, res) => {
  if (req.user.role !== "executive") return res.sendStatus(403);

  const slot = await Slot.create({
    executiveId: req.user.id,
    ...req.body
  });
  res.json(slot);
});

// Student books slot
router.post("/book/:slotId", auth, async (req, res) => {
  const slot = await Slot.findById(req.params.slotId);
  if (slot.isBooked) return res.status(400).send("Already booked");

  slot.isBooked = true;
  await slot.save();

  await Booking.create({
    slotId: slot._id,
    studentId: req.user.id
  });

  res.send("Slot booked");
});

// Get available slots
router.get("/available", async (req, res) => {
  const slots = await Slot.find({ isBooked: false });
  res.json(slots);
});


module.exports = router;

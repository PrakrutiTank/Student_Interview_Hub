const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  executiveId: mongoose.Schema.Types.ObjectId,
  role: String, // SDE, Data Analyst
  interviewType: String, // HR / Technical
  date: String,
  time: String,
  isBooked: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Slot", slotSchema);

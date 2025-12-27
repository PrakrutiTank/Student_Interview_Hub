const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  slotId: mongoose.Schema.Types.ObjectId,
  studentId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model("Booking", bookingSchema);

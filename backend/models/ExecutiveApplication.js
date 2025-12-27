const mongoose = require("mongoose");

const executiveApplicationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  skills: [String],
  interviewTypes: [String], // HR, Technical
  experience: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model(
  "ExecutiveApplication",
  executiveApplicationSchema
);

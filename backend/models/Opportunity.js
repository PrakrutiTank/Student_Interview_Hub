const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: String,
  type: String, // Internship / Hackathon
  description: String,
  deadline: String
});

module.exports = mongoose.model("Opportunity", opportunitySchema);

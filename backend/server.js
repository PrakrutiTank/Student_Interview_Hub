const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

/* CORS */
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

/* MongoDB */
mongoose
  .connect("mongodb://127.0.0.1:27017/interviewhub")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* Routes */
app.use("/executive", require("./routes/executive"));
app.use("/slot", require("./routes/slot"));
app.use("/opportunity", require("./routes/opportunity"));

/* Catch-all 404 */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* Start server */
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

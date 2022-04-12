const mongoose = require("mongoose");
const todoTaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("TodoTask", todoTaskSchema);

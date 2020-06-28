const mongoose = require("mongoose");
const { date } = require("joi");

const SlotSchema = new mongoose.Schema({
  slot_datetime: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Slots", SlotSchema);

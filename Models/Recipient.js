const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  blood_group: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

module.exports = mongoose.model("Recipient", RecipientSchema);

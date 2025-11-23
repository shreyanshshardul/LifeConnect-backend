const mongoose = require("mongoose");

const DonarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  blood_group: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String, required: true },
});

module.exports =
  mongoose.models.Donar || mongoose.model("Donar", DonarSchema);

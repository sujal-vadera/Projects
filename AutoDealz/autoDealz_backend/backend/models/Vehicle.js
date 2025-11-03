const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleName: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "city",
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, 
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("vehicle", vehicleSchema);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PlaceSchema = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  desc: String,
  perks: [String],
  extraInfo: String,
  checkin: Number,
  checkout: Number,
  maxGuests: Number,
});

const PlaceModel = model("Place", PlaceSchema);

module.exports = PlaceModel;

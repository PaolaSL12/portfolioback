const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    academy: { type: String, required: true },
    imageUrl: { type: String, required: true },
    url: { type: String, required: true },
    language: { type: String, required: true, enum: ["es", "en"] }
  },
  {
    timestamps: true,
    collection: "certificates",
  }
);

const Certificate = mongoose.model("certificates", certificateSchema, "certificates");
module.exports = Certificate;

const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
    aboutMe: { type: String, required: true },
    imageUrl: { type: String, required: true },
    language: { type: String, required: true, enum: ["es", "en"] }
  },
  {
    timestamps: true,
    collection: "profiles",
  }
);

const Profile = mongoose.model("profiles", profileSchema, "profiles");
module.exports = Profile;

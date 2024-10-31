const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    language: { type: String, required: true, enum: ["es", "en"] }
  },
  {
    timestamps: true,
    collection: "skills",
  }
);

const Skill = mongoose.model("skills", skillsSchema, "skills");
module.exports = Skill;

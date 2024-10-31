const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: String, required: true },
    url: { type: String, required: true },
    imageUrl: { type: String, required: true },
    language: { type: String, required: true, enum: ["es", "en"] },
  },
  {
    timestamps: true,
    collection: "projects",
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
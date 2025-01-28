const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: [
      {
        titleDesc: { type: String, required: true },
        desc: [{ type: String, required: true }],
      },
    ],
    technologies: [
      {
        name: { type: String, required: true },
        desc: [{ type: String, required: true }],
      },
    ],
    url: { type: String, required: true },
    imageUrl: { type: String, required: true },
    imgs:[
      {
        name: { type: String, required: true },
        url: [{ type: String, required: true }],
      },
    ],
    language: { type: String, required: true, enum: ["es", "en"] },
    relatedProject: { type: String }
  },
  {
    timestamps: true,
    collection: "projects",
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;

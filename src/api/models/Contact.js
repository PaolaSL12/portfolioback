const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
    {
      email: { type: String, required: true },
      socials: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true }
        }
      ],
      language: { type: String, required: true, enum: ["es", "en"] }
    },
    {
      timestamps: true,
      collection: "contacts",
    }
  );

const Contact = mongoose.model("contacts", contactSchema, "contacts");
module.exports = Contact;

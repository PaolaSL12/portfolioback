const validateLanguage = require("../../middlewares/validateLang");
const { getContacts, addContact, updateContact, removeContact, sendEmail } = require("../controllers/Contact");

const contactRouter = require("express").Router();


contactRouter.use('/:lang', validateLanguage);

contactRouter.get("/:lang/contacts", getContacts);
contactRouter.post("/:lang/contacts", addContact);
contactRouter.put("/:lang/contacts/:id", updateContact);
contactRouter.delete("/:lang/contacts/:id", removeContact);
contactRouter.post("/:lang/contact/send", sendEmail);

module.exports = contactRouter;
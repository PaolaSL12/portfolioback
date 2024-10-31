const Contact = require("../models/Contact");

const getContacts = async (req, res) => {
    const lang = req.params.lang;

    try {
        const contacts = await Contact.find({ language: lang });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los contactos' });
    }
};

const addContact = async (req, res) => {
    const lang = req.params.lang;

    try {
        const contact = new Contact({ ...req.body, language: lang });
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el contacto' });
    }
};

const updateContact = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const updatedContact = await Contact.findOneAndUpdate(
            { _id: id, language: lang },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        res.json(updatedContact);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el contacto' });
    }
};

const removeContact = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const deletedContact = await Contact.findOneAndDelete({ _id: id, language: lang });

        if (!deletedContact) {
            return res.status(404).json({ error: 'Contacto no encontrado' });
        }

        res.status(200).json("Eliminado correctamente");
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el contacto' });
    }
};

module.exports = { getContacts, addContact, updateContact, removeContact };
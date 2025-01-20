const Contact = require("../models/Contact");
const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
require('dotenv').config();

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



const sendEmail = async (req, res) => {
    const { name, email, message } = req.body;

    try {

        AWS.config.update({
            region: 'eu-north-1', 
            accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  
        });


        const transporter = nodemailer.createTransport({
            SES: new AWS.SES({ apiVersion: '2010-12-01' })
        });


        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER_FROM}>`,  
            to: process.env.EMAIL_USER,
            subject: `Nuevo mensaje de ${name}`,
            text: `Has recibido un nuevo mensaje de ${name} (${email}):\n\n${message}`,
        };


        const result = await transporter.sendMail(mailOptions);

         console.log('Correo enviado con éxito:', result);

        res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ success: false, message: 'Error al enviar el correo' });
    }
};

module.exports = { getContacts, addContact, updateContact, removeContact, sendEmail };
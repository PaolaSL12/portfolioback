const Certificate = require("../models/Certificate");


const getCertificates = async (req, res) => {
    const lang = req.params.lang;

    try {
        const certificates = await Certificate.find({ language: lang });
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los certificados' });
    }
};

const addCertificate = async (req, res) => {
    const lang = req.params.lang;

    try {
        const certificate = new Certificate({ ...req.body, language: lang });
        const savedCertificate = await certificate.save();
        res.status(201).json(savedCertificate);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el certificado' });
    }
};

const updateCertificate = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const updatedCertificate = await Certificate.findOneAndUpdate(
            { _id: id, language: lang },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedCertificate) {
            return res.status(404).json({ error: 'Certificado no encontrado' });
        }

        res.json(updatedCertificate);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el certificado' });
    }
};

const removeCertificate = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const deletedCertificate = await Certificate.findOneAndDelete({ _id: id, language: lang });

        if (!deletedCertificate) {
            return res.status(404).json({ error: 'Certificado no encontrado' });
        }

        res.status(200).json("certificado eliminado correctamente");
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el certificado' });
    }
};

module.exports = { getCertificates, addCertificate, updateCertificate, removeCertificate };
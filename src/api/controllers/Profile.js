const Profile = require("../models/Profile");

const getProfile = async (req, res) => {
    const lang = req.params.lang; 
    try {
        const profiles = await Profile.find({ language: lang });
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' });
    }
};

const addProfile = async (req, res) => {
    const lang = req.params.lang; 

    try {
        const profile = new Profile({ ...req.body, language: lang });
        const savedProfile = await profile.save();
        res.status(201).json(savedProfile);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el perfil' });
    }
};

const updateProfile = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { _id: id, language: lang },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }

        res.json(updatedProfile);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar el perfil' });
    }
};

const removeProfile = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const deletedProfile = await Profile.findOneAndDelete({ _id: id, language: lang });

        if (!deletedProfile) {
            return res.status(404).json({ error: 'Perfil no encontrado' });
        }

        res.status(200).json("eliminado correctamente");
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el perfil' });
    }
};

module.exports = { getProfile, addProfile, updateProfile, removeProfile };
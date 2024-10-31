const Skill = require("../models/Skill");

const getSkills = async (req, res) => {
    const lang = req.params.lang;
    try {
        const skills = await Skill.find({ language: lang });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las habilidades' });
    }
};

const addSkill = async (req, res) => {
    const lang = req.params.lang;

    try {
        const skill = new Skill({ ...req.body, language: lang });
        const savedSkill = await skill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la habilidad' });
    }
};

const updateSkill = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const updatedSkill = await Skill.findOneAndUpdate(
            { _id: id, language: lang },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSkill) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }

        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la habilidad' });
    }
};

const removeSkill = async (req, res) => {
    const lang = req.params.lang;
    const { id } = req.params;

    try {
        const deletedSkill = await Skill.findOneAndDelete({ _id: id, language: lang });

        if (!deletedSkill) {
            return res.status(404).json({ error: 'Habilidad no encontrada' });
        }

        res.status(200).json("skill eliminada correctamente");
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la habilidad' });
    }
};

module.exports = { getSkills, addSkill, updateSkill, removeSkill };
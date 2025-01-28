const Project = require("../models/Project");

const getProjects = async (req, res) => {
    const lang = req.params.lang;

    try {
        const projects = await Project.find({ language: lang });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

const getProjectById = async (req, res) => {
    const { id, lang } = req.params; 

    try {
        const project = await Project.findOne({ _id: id, language: lang });

        if (!project) {
            return res.status(404).json({ error: 'Proyecto no encontrado o idioma incorrecto' });
        }

        res.json(project);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el proyecto' });
    }
};

const addProject = async (req, res) => {
    const lang = req.params.lang;
    const { title, description, technologies, url, imageUrl, imgs, relatedProject } = req.body; 

    if (!title || !description || !technologies || !url || !imageUrl ||!imgs) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const project = new Project({
            title,
            description,
            technologies,
            url,
            imageUrl,
            imgs,
            language: lang,
            relatedProject: relatedProject 
        });

        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error('Error al guardar el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};

const removeProject = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }
        res.status(200).json('Proyecto eliminado');
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar el proyecto' });
    }
};

const updateProject = async (req, res) => {
    const { id, lang } = req.params;
    const { title, description, technologies, url, imageUrl, relatedProject } = req.body; 

    try {
        const updatedProject = await Project.findOneAndUpdate(
            { _id: id, language: lang }, 
            {
                title,
                description,
                technologies,
                url,
                imageUrl,
                relatedProject: relatedProject 
            },
            { new: true } 
        );

        if (!updatedProject) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

module.exports = { getProjects, addProject, removeProject, getProjectById, updateProject };
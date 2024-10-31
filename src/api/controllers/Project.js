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

const addProject = async (req, res) => {
    const lang = req.params.lang;

    const { title, description, technologies, url, imageUrl } = req.body;

    if (!title || !description || !technologies || !url || !imageUrl) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {

        const project = new Project({ 
            title, 
            description, 
            technologies, 
            url, 
            imageUrl, 
            language: lang 
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

module.exports = { getProjects, addProject, removeProject };
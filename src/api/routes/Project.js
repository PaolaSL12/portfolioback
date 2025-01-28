const validateLanguage = require("../../middlewares/validateLang");
const { getProjects, addProject, removeProject, getProjectById, updateProject } = require("../controllers/Project");

const projectsRouter = require("express").Router();


projectsRouter.use('/:lang', validateLanguage);

projectsRouter.get("/:lang/projects", getProjects);
projectsRouter.get("/:lang/projects/:id", getProjectById);
projectsRouter.post("/:lang/projects", addProject);
projectsRouter.delete("/:lang/projects/:id", removeProject);
projectsRouter.put("/:lang/projects/:id", updateProject);

module.exports = projectsRouter;
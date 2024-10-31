const validateLanguage = require("../../middlewares/validateLang");
const { getProjects, addProject, removeProject } = require("../controllers/Project");

const projectsRouter = require("express").Router();


projectsRouter.use('/:lang', validateLanguage);

projectsRouter.get("/:lang/projects", getProjects);
projectsRouter.post("/:lang/projects", addProject);
projectsRouter.delete("/:lang/projects/:id", removeProject);

module.exports = projectsRouter;
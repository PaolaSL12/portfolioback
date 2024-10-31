const validateLanguage = require("../../middlewares/validateLang");
const { getSkills, addSkill, updateSkill, removeSkill } = require("../controllers/Skill");

const skillRouter = require("express").Router();

skillRouter.use('/:lang', validateLanguage);


skillRouter.get("/:lang/skills", getSkills);
skillRouter.post("/:lang/skills", addSkill);
skillRouter.put("/:lang/skills/:id", updateSkill);
skillRouter.delete("/:lang/skills/:id", removeSkill);


module.exports = skillRouter;
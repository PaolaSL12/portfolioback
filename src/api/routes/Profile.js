const validateLanguage = require("../../middlewares/validateLang");
const { getProfile, addProfile, removeProfile, updateProfile } = require("../controllers/Profile");

const profileRouter = require("express").Router();

profileRouter.use('/:lang', validateLanguage);

profileRouter.get('/:lang/profiles', getProfile);
profileRouter.post('/:lang/profiles', addProfile);
profileRouter.delete('/:lang/profiles/:id', removeProfile);
profileRouter.put('/:lang/profiles/:id', updateProfile);


module.exports = profileRouter;
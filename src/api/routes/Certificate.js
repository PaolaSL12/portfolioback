const validateLanguage = require("../../middlewares/validateLang");
const { getCertificates, addCertificate, updateCertificate, removeCertificate } = require("../controllers/Certificate");

const certificateRouter = require("express").Router();

certificateRouter.use('/:lang', validateLanguage);


certificateRouter.get("/:lang/certificates", getCertificates);
certificateRouter.post("/:lang/certificates", addCertificate);
certificateRouter.put("/:lang/certificates/:id", updateCertificate);
certificateRouter.delete("/:lang/certificates/:id", removeCertificate);

module.exports = certificateRouter;
const validateLanguage = (req, res, next) => {
    const validLanguages = ['es', 'en'];
    const lang = req.params.lang;

    if (!validLanguages.includes(lang)) {
        return res.status(400).json({ error: 'Idioma no soportado' });
    }

    next(); 
};

module.exports = validateLanguage;

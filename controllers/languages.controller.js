const Language = require("../models/Language.model");

module.exports.languagesController = {
  getAllLanguage: async (req, res) => {
    try {
      const language = await Language.find();
      res.json(language);
    } catch (e) {
      console.log(e.message);
    }
  },

  addLanguage: async (req, res) => {
    try {
      const language = await new Language({
        name: req.body.name,
      });
      language.save();
      res.json(language);
    } catch (e) {
      console.log(e.message);
    }
  },

  editLanguage: async (req, res) => {
    try {
      const language = await Language.findByIdAndUpdate(req.params.id, {
        $set: {
          ...req.body,
        },
      });
      res.json(language);
    } catch (e) {
      console.log(e.message);
    }
  },

  removeLanguage: async (req, res) => {
    try {
      const language = await Language.findByIdAndRemove(req.params.id);
      language.save()
      res.json('Удалил')
    } catch (e) {
      console.log(e.message);
    }
  },
};

const { Router } = require("express");
const { languagesController } = require("../controllers/languages.controller");

const router = Router();

router.get("/language", languagesController.getAllLanguage);
router.post("/language", languagesController.addLanguage);
router.delete("/language/:id", languagesController.removeLanguage);
router.patch("/language/:id", languagesController.editLanguage);

module.exports = router;

const { Router } = require("express");
const { mentorsController } = require("../controllers/mentors.controller");
const authMiddleware = require("../middlewares/mentor.auth.middlewares");

const router = Router();

router.post("/mentor/register", mentorsController.registerMentor);
router.post("/mentor/login", mentorsController.login);
router.post("/mentor/avatar", authMiddleware, mentorsController.addAvatar);
router.get("/mentors", mentorsController.randomMentor);
router.get("/mentor/:id/language", mentorsController.mentorByLanguage);
router.get("/mentor/:id/profile", mentorsController.oneMentor);
router.patch("/mentor/:id/update", mentorsController.updateMentor);
router.get("/mentor/page", mentorsController.allMentor);
router.delete('/mentor/:id/delete', mentorsController.deleteMentor)

module.exports = router;

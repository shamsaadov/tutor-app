const { Router } = require("express");
const { usersController } = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/user.auth.middlewares");

const router = Router();

router.post("/user/login", usersController.login);
router.post("/user/register", usersController.registerUser);
router.get("/users", usersController.getAllUser);
router.delete("/user/:id", usersController.removeUser);
router.post("/mentor/avatar", authMiddleware, usersController.addAvatar);
router.patch("/user/:id", usersController.editUser);
router.post("/:mentorId/add/:userId", usersController.addUserToMentor);

module.exports = router;

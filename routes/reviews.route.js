const { Router } = require("express");
const { reviewsController } = require("../controllers/reviews.controller");
const { userMiddleware } = require("../middlewares/user.auth.middlewares");

const router = Router();

router.get("/review/:id", reviewsController.getReview);
router.post("/review/userId/mentorId", reviewsController.addReview);
router.delete("/review/:id", reviewsController.removeReview);
router.patch("/review/:id", reviewsController.editReview);

module.exports = router;

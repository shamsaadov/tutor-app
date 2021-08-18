const { Router } = require("express");
const languageRoute = require("./languages.route");
const mentorRoute = require("./mentors.route");
const reviewRoute = require("./reviews.route");
const userRoute = require("./users.route");

const router = Router();

router.use(languageRoute);
router.use(mentorRoute);
// router.use(reviewRoute);
 router.use(userRoute);

module.exports = router;

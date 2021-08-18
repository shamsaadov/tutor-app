const Review = require("../models/Review.model");

module.exports.reviewsController = {
  getReview: async (req, res) => {
    const { id } = req.params;
    const review = await Review.findById(id);
    res.json(review);
  },

  addReview: async (req, res) => {
    try {
      const review = await new Review({
        text: req.body.text,
        userId: req.params.userId,
        mentorId: req.params.mentorId,
      });
      res.json(review);
    } catch (e) {
      console.log(e.message);
    }
  },

  editReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndUpdate(req.params.id, {
        $set: {
          ...req.body,
        },
      });
      res.json(review);
    } catch (e) {
      console.log(e.message);
    }
  },

  removeReview: async (req, res) => {
    try {
      const review = await Review.findByIdAndRemove(req.params.id);
      res.json("Удалил отзыв");
    } catch (e) {
      console.log(e.message);
    }
  },
};

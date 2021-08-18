const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    mentorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mentor",
    },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;

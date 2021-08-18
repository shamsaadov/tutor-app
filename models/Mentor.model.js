const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default:
      "https://ipbmafia.ru/uploads/monthly_2017_07/camera_400.png.fb69ac5f6f90010f4ad8e827cf0233ca.png",
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "",
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 1000, // сделаем алерт при успешной регистрации что дали бонус тыщу рублей
  },
  payment: {
    type: Number,
    required: true,
  },
  language: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Language",
  },
  role: {
    type: String,
    default: "Mentor",
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  students: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

const Mentor = mongoose.model("Mentor", mentorSchema);
module.exports = Mentor;

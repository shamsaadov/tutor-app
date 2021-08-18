const Mentor = require("../models/Mentor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports.mentorsController = {
  addAvatar: async (req, res) => {
    const file = req.files.file;
    const fileName = file.name;
    const url = path.resolve(__dirname, "../public/uploads/img/" + fileName);
    const urlForDB = "/uploads/img/" + fileName;
    try {
      await file.mv(url, async (err) => {
        if (err) {
          console.log(err);
        } else {
          const mentor = await Mentor.findById(req.mentor.id);

          mentor.avatar = urlForDB;
          mentor.save();
          res.json({
            success: "Картинка загружена",
            avatar: urlForDB,
          });
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  },

  registerMentor: async (req, res) => {
    const {
      name,
      surname,
      phoneNumber,
      avatar,
      gender,
      login,
      password,
      balance,
      payment,
      language,
      students,
    } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое имя ментора",
      });
    }
    if (!surname) {
      return res.status(400).json({
        error: "Необходимо указать новую фамилию ментора",
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        error: "Необходимо указать новый номер ментора",
      });
    }
    if (!gender) {
      return res.status(400).json({
        error: "Необходимо заново указать пол ментора",
      });
    }
    if (!login) {
      return res.status(400).json({
        error: "Необходимо указать новый логин ментора",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Необходимо указать новый пароль ментора",
      });
    }
    if (!payment) {
      return res.status(400).json({
        error: "Необходимо указать зарплату ментора",
      });
    }
    if (!language) {
      return res.status(400).json({
        error: "Необходимо указать язык мента",
      });
    }
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
    try {
      const mentor = await Mentor.create({
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        avatar: avatar,
        gender: gender,
        login: login,
        password: hash,
        balance: balance,
        payment: payment,
        language: language,
        students: students,
      });
      return res.json(mentor);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;

    const candidate = await Mentor.findOne({ login });

    if (!candidate) {
      return res.status(401).json("Неверный логин");
    }

    const valid = await bcrypt.compare(password, candidate.password);

    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "7d",
    });
    console.log(candidate);
    return res.json({ token, role: "Mentor", candidate });
  },

  randomMentor: async (req, res) => {
    const mentor = await Mentor.aggregate([{ $sample: { size: 4 } }]);
    res.json(mentor);
  },

  allMentor: async (req, res) => {
    const mentor = await Mentor.find();
    res.json(mentor);
  },

  updateMentor: async (req, res) => {
    const { id } = req.params;
    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.send(mentor);
  },

  mentorByLanguage: async (req, res) => {
    const { id } = req.params;
    try {
      const mentor = await Mentor.find({ language: id }).populate(
        "language",
        "name, _id"
      );
      return res.json(mentor);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  oneMentor: async (req, res) => {
    const { id } = req.params;
    const mentor = await Mentor.findById(id);
    res.json(mentor);
  },

  deleteMentor: async (req, res) => {
    const { id } = req.params;
    const mentor = await Mentor.findByIdAndDelete(id);
    res.json("аккаунт удален");
  },
};

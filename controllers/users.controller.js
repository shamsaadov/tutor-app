const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const Mentor = require("../models/Mentor.model");

module.exports.usersController = {
  getAllUser: async (req, res) => {
    const user = await User.find();
    res.json(user);
  },

  registerUser: async (req, res) => {
    const {
      name,
      surname,
      phoneNumber,
      avatar,
      gender,
      login,
      password,
      balance,
      access,
    } = req.body;
    if (!name) {
      return res.status(400).json({
        error: "Необходимо указать новое имя пользователя",
      });
    }
    if (!surname) {
      return res.status(400).json({
        error: "Необходимо указать новую фамилию пользователя",
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        error: "Необходимо указать новый номер пользователя",
      });
    }
    if (!gender) {
      return res.status(400).json({
        error: "Необходимо заново указать пол пользователя",
      });
    }
    if (!login) {
      return res.status(400).json({
        error: "Необходимо указать новый логин пользователя",
      });
    }
    if (!password) {
      return res.status(400).json({
        error: "Необходимо указать новый пароль пользователя",
      });
    }

    try {
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const user = await User.create({
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        avatar: avatar,
        gender: gender,
        login: login,
        password: hash,
        balance: balance,
        access: access,
      });
      res.json(user);
    } catch (e) {
      return res.status(400).json(e.toString());
    }
  },

  login: async (req, res) => {
    const { login, password } = req.body;
    const candidate = await User.findOne({ login });
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
    return res.json({ token, role: "User", candidate });
  },

  removeUser: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findByIdAndRemove({ id });

      res.json("Пользователь успешно удален");
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

  editUser: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.json(user);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },

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

  addUserToMentor: async (req, res) => {
    const { mentorId } = req.params;
    const { userId } = req.params;
    try {
      const toMentor = await Mentor.updateOne(
        {
          _id: mentorId,
        },
        {
          $addToSet: { students: { userId } },
        }
      );
      await res.json(toMentor);
    } catch (e) {
      return res.status(400).json({
        error: e.toString(),
      });
    }
  },
};

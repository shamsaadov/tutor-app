const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json("Доступ запрещен! Неверный авторизатион хидер");
  }
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    res.status(401).json("Неверный тип токена");
  }
  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);
    next();
  } catch (e) {
    res.status(401).json("Ошибка авторизации читай следующее" + e.toString());
  }
};

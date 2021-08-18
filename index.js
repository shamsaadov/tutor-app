require("dotenv").config();
const chalk = require("chalk");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");
const path = require("path");
const file = require("express-fileupload");
const indexRoutes = require("./routes/index.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(file());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.static(path.resolve(__dirname, "client", 'build')));
app.get('*', ((req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
}))
app.use(morgan("dev"));
app.use(indexRoutes);

const connectDBandLocalServer = async () => {
  try {
    await mongoose
      .connect(process.env.MONGOOSE, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log(chalk.blue("Успешное подключение к MONGODB"));
      });

    app.listen(process.env.PORT, () => {
      console.log(
        chalk.blue(
          `Подключился к локальному порту с номером: ${process.env.PORT}`
        )
      );
    });
  } catch (e) {
    console.log(chalk.red(e.message));
  }
};
connectDBandLocalServer();

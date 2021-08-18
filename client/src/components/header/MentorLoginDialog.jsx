import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useDispatch } from "react-redux";
import { fetchLoginMentor } from "../../redux/features/application";
import { NavLink } from "react-router-dom";

const MentorLogin = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  const dispatch = useDispatch();

  const [login, setLogin] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    setLogin(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginMentor = () => {
    dispatch(fetchLoginMentor({ login, password }));
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Войти как ментор</h2>
        </Grid>
        <TextField
          label="Логин"
          placeholder="Введите логин"
          fullWidth
          required
          onChange={handleLogin}
        />
        <TextField
          label="Пароль"
          placeholder="Введите пароль"
          type="password"
          fullWidth
          required
          onChange={handlePassword}
        />
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Запомнить меня"
        />
        <NavLink to="/">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={handleLoginMentor}
          >
            Sign in
          </Button>
        </NavLink>
        <Typography
          onClick={() => {
            {
              alert("Не надо было забывать! хьо жим ма ваци");
            }
          }}
        >
          Забыли пароль?
        </Typography>
      </Paper>
    </Grid>
  );
};

export default MentorLogin;

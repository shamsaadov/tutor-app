import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Grid, RadioGroup, Box, FormControlLabel, Radio, FormControl,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRegisterUsers } from "../../redux/features/user.reducer";
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  btnUser: {
    marginLeft: theme.spacing(1),
  },
  colorInherit: {
    fontFamily: "Bebas Neue",
    fontSize: 18,
    borderColor: "#3b82b1",
    color: "#3b82b1",
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
}));

export default function FormDialog() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");

  const handleSetFirstName = (e) => {
    setName(e.target.value);
  };

  const handleSetLastName = (e) => {
    setSurname(e.target.value);
  };

  const handleSetPhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPass = (e) => {
    setPass(e.target.value);
  };

  const handleSetGender = (e) => {
    setGender(e.target.value);
  };

  const handleRegisterUser = () => {
    dispatch(fetchRegisterUsers({ name, surname, phone, login, pass, gender }));
    setOpen(false);
  };

  return (
    <div className={classes.btnUser}>
      <Button
        variant="outlined"
        className={classes.colorInherit}
        onClick={handleClickOpen}
      >
        Sign Up as User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Регистрация пользователя
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Заполните поля для регистрации</DialogContentText>
          <Grid>
            <TextField
              onChange={handleSetFirstName}
              fullWidth
              autoFocus
              margin="dense"
              id="name"
              label="Имя"
              type="text"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleSetLastName}
              fullWidth
              autoFocus
              margin="dense"
              id="name"
              label="Фамилия"
              type="text"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleSetPhone}
              fullWidth
              autoFocus
              margin="dense"
              id="name"
              label="Телефон"
              type="text"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleSetLogin}
              fullWidth
              autoFocus
              margin="dense"
              id="name"
              label="Логин"
              type="text"
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={handleSetPass}
              fullWidth
              autoFocus
              margin="dense"
              id="name"
              label="Пароль"
              type="password"
            />
          </Grid>
          <Grid>
            <FormControl component="fieldset">
              <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={gender}
                  onChange={handleSetGender}
              >
                <Box style={{ display: "flex", marginTop: 15 }}>
                  <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                  />
                  <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>

         <NavLink to={'/user/login/page'}>
           <Button
             variant="contained"
             type="submit"
             size="small"
             onClick={handleRegisterUser}
             color="primary"
           >
             Зарегистрироваться
           </Button>
         </NavLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}

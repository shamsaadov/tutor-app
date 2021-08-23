import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Grid,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  Box,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useState } from "react";
import { fetchRegisterMentor } from "../../redux/features/mentor.reducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "center",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  colorInherit: {
    fontFamily: "Bebas Neue",
    fontSize: 18,
    marginLeft: 120,
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
  const [dropOpen, setDropOpen] = useState(false);

  const languages = useSelector((state) => state.language.items);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDropOpen = () => {
    setDropOpen(true);
  };

  const handleDropClose = () => {
    setDropOpen(false);
  };

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [payment, setPayment] = useState("");
  const [avatar, setAvatar] = useState("");

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

  const handleSetLanguage = (e) => {
    setLanguage(e.target.value);
  };

  const handleSetPayment = (e) => {
    setPayment(e.target.value);
  };


  const handleRegisterMentor = () => {
    dispatch(
      fetchRegisterMentor({
        name,
        surname,
        phone,
        login,
        pass,
        gender,
        language,
        payment,
        avatar,
      })
    );
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.colorInherit}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Sign Up as Mentor
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle className={classes.title} id="form-dialog-title">
          Регистрация ментора
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
          <Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-controlled-open-select-label">
                Язык
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={dropOpen}
                onClose={handleDropClose}
                onOpen={handleDropOpen}
                onChange={handleSetLanguage}
              >
                {languages.map((item) => {
                  return <MenuItem value={item._id}>{item.name}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid>
            <TextField
              onChange={handleSetPayment}
              type="text"
              fullWidth
              autoFocus
              margin="dense"
              label="Зарплата"
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <NavLink to={'/mentor/login/page'}>
            <Button
              size="small"
              variant="contained"
              type="submit"
              onClick={handleRegisterMentor}
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

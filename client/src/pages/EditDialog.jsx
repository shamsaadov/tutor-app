import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { DialogContentText, makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUpdateMentor,
  fetchUpdateUser,
} from "../redux/features/application";

const useStyles = makeStyles({
  editBtn: {
    color: "#3b82b1",
    border: "1px solid #3b82b1",
    borderRadius: 10,
    width: 250,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
});

export default function EditDialog({ name, surname, login, phone, id }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const candidate = useSelector((state) => state.application.candidate);

  const [newName, setName] = useState(name);
  const [newSurname, setSurname] = useState(surname);
  const [newPhone, setPhone] = useState(phone);
  const [newLogin, setLogin] = useState(login);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditUser = async () => {
    await dispatch(
      fetchUpdateUser({ newName, newSurname, newPhone, newLogin, id })
    );
    setOpen(false);
  };

  const handleEditAndClose = async () => {
    await dispatch(
      fetchUpdateMentor({
        newName,
        newSurname,
        newPhone,
        newLogin,
        id,
      })
    );
    setOpen(false);
  };

  const handleEditName = (e) => {
    return setName(e.target.value);
  };

  const handleEditSurname = (e) => {
    return setSurname(e.target.value);
  };

  const handleEditNumber = (e) => {
    return setPhone(e.target.value);
  };

  const handleEditLogin = (e) => {
    return setLogin(e.target.value);
  };

  return (
    <div>
      <Button
        className={classes.editBtn}
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Изменить данные
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>Введите новые данные</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя"
            type="text"
            fullWidth
            defaultValue={name}
            onChange={handleEditName}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Фамилия"
            type="text"
            fullWidth
            defaultValue={surname}
            onChange={handleEditSurname}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Номер"
            type="text"
            fullWidth
            defaultValue={phone}
            onChange={handleEditNumber}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Логин"
            type="text"
            fullWidth
            defaultValue={login}
            onChange={handleEditLogin}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          {candidate.role === "Mentor" ? (
            <Button color="primary" onClick={handleEditAndClose}>
              Изменить
            </Button>
          ) : (
            <Button color="primary" onClick={handleEditUser}>
              Изменить
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

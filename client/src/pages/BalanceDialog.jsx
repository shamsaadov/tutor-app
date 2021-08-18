import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  balanceBtn: {
    marginLeft: 25,
    marginTop: 15,
    color: "#3b82b1",
    border: "1px solid #3b82b1",
    borderRadius: 10,
    width: 250,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
}));

export default function BalanceDialog() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [balance, setBalance] = useState("");

  const handleSetBalance = (e) => {
    setBalance(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={classes.balanceBtn}
      >
        Пополнить баланс
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Введите данные вашей карты
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Номер карты"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Имя владельца (как на карте)"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Срок годности"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="CVV код"
            type="password"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Сумма пополнения"
            type="text"
            fullWidth
            onChange={handleSetBalance}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleClose} color="primary">
            Пополнить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

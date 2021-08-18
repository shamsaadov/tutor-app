import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  roleAndTokenRemove,
  uploadAvatar,
} from "../redux/features/application";
import { deleteAccount } from "../redux/features/mentor.reducer";
import { NavLink } from "react-router-dom";
import EditDialog from "./EditDialog";
import BalanceDialog from './BalanceDialog'

const useStyles = makeStyles({
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 10,
    margin: 25,
    boxShadow: "0 0 15px black",
  },
  input: {
    display: "none",
  },
  mentorBlock: {
    width: 300,
    height: 450,
    borderRadius: 10,
    border: "1px solid #3b82b1",
    margin: "0 25px 0 25px",
  },
  avatarBtn: {
    color: "#3b82b1",
    border: "1px solid #3b82b1",
    borderRadius: 10,
    width: 250,
    margin: "0 0 25px 25px",
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  descriptionBlock: {
    borderRadius: 10,
    border: "1px solid #3b82b1",
    width: "74%",
    height: 450,
  },
  deleteBtn: {
    color: "#FF0000",
    border: "1px solid #FF0000",
    borderRadius: 10,
    width: 250,
    marginLeft: 15,
    "&:hover": {
      backgroundColor: "#FFA500",
      color: "#fff",
      border: "1px solid #FFA500",
    },
  },
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
  uploadBtn: {
    width: 250,
    marginTop: 25,
    marginLeft: 25,
    borderRadius: 10,
    border: "1px solid #3b82b1",
    color: "#3b82b1",
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  links: {
    textDecoration: "none",
    color: "#3b82b1",
    "&:hover": {
      color: "#fff",
    },
  },
});

function PrivatePage() {
  const classes = useStyles();

  const candidate = useSelector((state) => state.application.candidate);

  const dispatch = useDispatch();

  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  };

  const handleDeleteMentor = () => {
    dispatch(deleteAccount(candidate._id));
    dispatch(roleAndTokenRemove());
  };

  return (
    <Grid container>
      <Grid className={classes.mentorBlock} item>
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={handleChangeAvatar}
        />

        <img className={classes.avatar} src={candidate.avatar} />
        <label htmlFor="icon-button-file">
          <Button
            color="default"
            aria-label="upload picture"
            component="span"
            className={classes.uploadBtn}
          >
            Поменять аватар
          </Button>
          <BalanceDialog/>
        </label>
      </Grid>
      <Grid className={classes.descriptionBlock} item>
        <Box style={{ marginLeft: 25, marginTop: 25 }}>
          <Box style={{ display: "flex" }}>
            <Box>
              <Typography style={{ marginBottom: 15 }} variant="h4">
                Имя: {candidate.name}
              </Typography>
              <Typography style={{ marginBottom: 15 }} variant="h4">
                Фамилия: {candidate.surname}
              </Typography>
              <Typography style={{ marginBottom: 15 }} variant="h4">
                Номер: {candidate.phoneNumber}
              </Typography>
              <Typography style={{ marginBottom: 15 }} variant="h4">
                Логин: {candidate.login}
              </Typography>
              <Typography style={{ marginBottom: 15 }} variant="h4">
                Баланс: {candidate.balance + "₽"}
              </Typography>
            </Box>
            <Box>{/*list of students*/}</Box>
          </Box>
          <Button>
            <EditDialog
              name={candidate.name}
              surname={candidate.surname}
              phone={candidate.phoneNumber}
              login={candidate.login}
              id={candidate._id}
            />
          </Button>
          <NavLink className={classes.links} to={"/"}>
            <Button
              className={classes.deleteBtn}
              onClick={() => {
                if (window.confirm("Вы хотите удалить аккаунт?")) {
                  handleDeleteMentor();
                }
              }}
            >
              Удалить аккаунт
            </Button>
          </NavLink>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PrivatePage;

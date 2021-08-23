import React, { useEffect } from "react";
import { Box, Grid, Typography, makeStyles, Button } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorProfile } from "../redux/features/mentor.reducer";
import Preloader from "../Preloaders/Preloader";
import { addUserToMentor } from "../redux/features/user.reducer";

const useStyles = makeStyles({
  avatar: {
    width: 300,
    height: 300,
    marginLeft: 25,
    marginTop: 25,
    borderRadius: 10,
  },
  avatarBlock: {
    backgroundColor: "#fff",
    width: 350,
    height: 400,
    borderRadius: 10,
    border: "1px solid #3b82b1",
  },
  chatBtn: {
    width: 300,
    marginLeft: 25,
    marginTop: 15,
    color: "#3b82b1",
    borderRadius: 10,
    border: "1px solid #3b82b1",
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#FFF",
    },
  },
  paymentBlock: {
    backgroundColor: "#ffffff",
    width: 350,
    borderRadius: 10,
    border: "1px solid #3b82b1",
    marginTop: 25,
    paddingTop: 25,
    paddingBottom: 25,
  },
  paymentTitle: {
    textAlign: "center",
  },
  links: {
    textDecoration: "none",
    color: "#3b82b1",
    "&:hover": {
      color: "#fff",
    },
  },
  infoBlock: {
    margin: "15px 0 0 25px",
  },
  buyBtn: {
    margin: "305px 0 0 25px",
  },
});

function MentorProfile() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const mentor = useSelector((state) => state.mentor.currentMentor);
  const loading = useSelector((state) => state.mentor.loading);
  const candidate = useSelector((state) => state.application.candidate);

  const bought = mentor.students.find((stud) => stud.userId === candidate._id);

  const handleBuyMentor = () => {
    if (candidate.balance < mentor.payment) {
      return alert("Недостаточно денег!");
    } else {
      dispatch(addUserToMentor(id, candidate._id));
    }
  };

  useEffect(() => {
    dispatch(fetchMentorProfile(id));
  }, [dispatch, id]);

  if (loading) {
    return <Preloader />;
  } else {
    return (
      <Box style={{ display: "flex" }}>
        <Box>
          <Grid container>
            <Grid className={classes.avatarBlock} item>
              <img
                className={classes.avatar}
                src={mentor.avatar}
                alt="avatar"
              />
              <Button className={classes.chatBtn}>Start chat</Button>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              className={classes.paymentBlock}
              item
              style={{ textAlign: "center" }}
            >
              <Typography className={classes.paymentTitle} variant="h4">
                Оплата в час
              </Typography>
              <Typography variant="h5">{`Payment/h: ${mentor.payment}₽`}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          style={{
            marginLeft: 25,
            border: "1px solid #3b82b1",
            borderRadius: 10,
            height: 549,
            width: "100%",
          }}
        >
          <Grid className={classes.infoBlock} item>
            <Typography style={{ marginBottom: 15 }} variant="h4">
              {`Имя: ${mentor.name}`}
            </Typography>
            <Typography
              style={{ marginBottom: 15 }}
              variant="h4"
            >{`Фамилия: ${mentor.surname}`}</Typography>
            {bought ? (
              <Typography variant="h4">{`Контакты: ${mentor.phoneNumber}`}</Typography>
            ) : null}
          </Grid>
          <Grid item></Grid>
          <Grid item>
            <NavLink className={classes.links} to={`/`}>
              <Button
                color={"secondary"}
                variant={"outlined"}
                className={classes.buyBtn}
                onClick={handleBuyMentor}
                disabled={bought}
              >
                {bought ? "Вы уже приобрели подписку" : "Купить подписку"}
              </Button>
            </NavLink>
          </Grid>
        </Box>
      </Box>
    );
  }
}

export default MentorProfile;

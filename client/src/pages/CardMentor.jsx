import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Box, Grid, Typography } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    justifyContent: "space-between",
    width: 250,
    marginLeft: 50,
  },
  media: {
    height: 140,
  },
  avatar: {
    width: 230,
    height: 210,
    borderRadius: "5px 5px 0 0",
  },
  cardBlock: {
    flexWrap: "nowrap",
    marginLeft: 70,
    width: 230,
    height: 350,
    borderRadius: 5,
    border: "1px solid #3b82b1",
    transition: ".1s",
    "&:hover": {
      cursor: "pointer",
      boxShadow: "0 0 15px #3b82b1",
    },
  },
  mentorName: {
    textAlign: "center",
    fontFamily: "Amatic SC, cursive",
    fontWeight: 800,
    fontSize: 18,
    margin: "10px auto 10px auto",
  },
  colorInherit: {
    fontFamily: "Bebas Neue",
    fontSize: 15,
    marginLeft: 80,
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
  likes: {
    color: "#3b82b1",
    marginRight: 20,
  },
  dislikes: {
    color: "#3b82b1",
  },
  rateBlock: {
    marginTop: 22,
    margin: "22px 0 0 75px",
  },
});

export default function CardMentor({ avatar, name, surname, mentorId }) {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <Box key={mentorId} className={classes.cardBlock}>
      <Grid item>
        <img className={classes.avatar} src={avatar} alt="" />
      </Grid>
      <Grid item>
        <Typography
          className={classes.mentorName}
        >{`${name} ${surname}`}</Typography>
      </Grid>
      <Grid item>
        <NavLink className={classes.links} to={`/mentor/${mentorId}/profile`}>
          <Button className={classes.colorInherit} size="small">
            Profile
          </Button>
        </NavLink>
      </Grid>
    </Box>
  );
}

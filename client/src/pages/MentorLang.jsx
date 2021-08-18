import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMentorByLanguageId } from "../redux/features/mentor.reducer";
import { Box, Button, Grid, makeStyles, Typography } from "@material-ui/core";
import Preloader from "../Preloaders/Preloader";

const useStyles = makeStyles((theme) => ({
  img: {
    display: "block",
    boxSizing: "border-box",
    width: 300,
    height: 250,
    borderRadius: 15,
  },
  mainGrid: {
    textAlign: "center",
    marginBottom: 25,
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 10,
    margin: 25,
    boxShadow: "0 0 15px black",
  },
  mentorBlock: {
    width: 300,
    height: 380,
    borderRadius: 10,
    border: "1px solid #3b82b1",
    margin: "0 25px 0 25px",
    boxShadow: "0 0 5px #3b82b1",
  },
  descriptionBlock: {
    borderRadius: 10,
    border: "1px solid #3b82b1",
    width: "74%",
    height: 380,
    marginBottom: 25,
    boxShadow: "0 0 5px #3b82b1",
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
  profileBtn: {
    border: "1px solid #3b82b1",
    borderRadius: 10,
    width: 300,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
}));

function MentorLang() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  const mentor = useSelector((state) => state.mentor.items);
  const loading = useSelector((state) => state.mentor.loading);

  useEffect(() => {
    dispatch(fetchMentorByLanguageId(id));
  }, [dispatch, id]);

  if (loading) {
    return <Preloader />;
  } else {
    return (
      <Grid container>
        {mentor.map((item) => {
          return (
            <Grid container>
              <Grid className={classes.mentorBlock} item>
                <img className={classes.avatar} src={item.avatar} />
                <NavLink
                  className={classes.links}
                  to={`/mentor/${item._id}/profile`}
                >
                  <Button
                    color="default"
                    aria-label="upload picture"
                    component="span"
                    className={classes.uploadBtn}
                  >
                    Профиль
                  </Button>
                </NavLink>
              </Grid>
              <Grid className={classes.descriptionBlock} item>
                <Box style={{ marginLeft: 25, marginTop: 25 }}>
                  <Typography style={{ marginBottom: 15 }} variant="h4">
                    Имя: {item.name}
                  </Typography>
                  <Typography style={{ marginBottom: 15 }} variant="h4">
                    Фамилия: {item.surname}
                  </Typography>
                  <Button className={classes.editBtn}>
                    {" "}
                    Здесь будет какой то текст
                  </Button>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default MentorLang;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMentor,
  fetchMentorProfile,
  selectMentor,
} from "../redux/features/mentor.reducer";
import Preloader from "../Preloaders/Preloader";
import {
  Box,
  Button,
  Grid,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";
import { searching } from "../redux/features/mentor.reducer";

const useStyles = makeStyles((theme) => ({
  profileBtn: {
    border: "1px solid #3b82b1",
    borderRadius: 10,
    width: 300,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  btnBlock: {
    marginLeft: 15,
  },
  links: {
    textDecoration: "none",
    color: "#3b82b1",
    "&:hover": {
      color: "#fff",
    },
  },
  alignCenter: {
    margin: "0 auto 40px auto",
    fontFamily: "Amatic SC, cursive",
    fontWeight: 800,
    fontSize: 42,
    color: "#3b82b1",
  },
  searchBlock: {
    width: 600,
    borderColor: "#3b82b1",
    margin: "0 auto 50px auto",
  },
  searchField: {
    width: 600,
    border: "1px solid #3b82b1",
    padding: 10,
    borderRadius: 10,
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
}));

function AllMentors() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searching(e.target.value));
  };

  const loading = useSelector((state) => state.mentor.loading);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchMentorProfile(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchAllMentor());
  }, [dispatch]);

  const mentor = useSelector(selectMentor);

  if (loading) {
    return <Preloader />;
  } else {
    return (
      <Grid container>
        <Grid container>
          <Typography className={classes.alignCenter} variant="h6">
            Поиск менторв по их навыкам
          </Typography>
        </Grid>
        <Grid container>
          <Grid container className={classes.searchBlock}>
            <InputBase
              onChange={handleSearch}
              className={classes.searchField}
              placeholder="Поиск"
              inputProps={{ "aria-label": "search" }}
            />
          </Grid>
          {mentor.map((item) => {
            return (
              <Grid container>
                <Grid className={classes.mentorBlock} item>
                  <img className={classes.avatar} src={item.avatar} />
                  <label htmlFor="icon-button-file">
                    <NavLink to={`/mentor/${item._id}/profile`} className={classes.links}>
                      <Button
                        color="default"
                        aria-label="upload picture"
                        component="span"
                        className={classes.uploadBtn}
                      >
                        Профиль
                      </Button>
                    </NavLink>
                  </label>
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
      </Grid>
    );
  }
}

export default AllMentors;

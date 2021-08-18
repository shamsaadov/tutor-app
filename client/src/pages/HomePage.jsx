import { Container, Grid, makeStyles, Box, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Preloader from "../Preloaders/Preloader";
import CardMentor from "./CardMentor";
import { fetchRandomMentor } from "../redux/features/mentor.reducer";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  allLang: {
    margin: "0 auto 40px auto",
  },
  colorInherit: {
    borderColor: "#3b82b1",
    color: "#000",
    height: 25,
    borderRadius: 50,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  searchButton: {
    color: "#3b82b1",
    border: "1px solid #3b82b1",
    height: 55,
    marginLeft: 15,
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  allMentors: {
    marginLeft: 530,
    marginTop: 25,
    borderColor: "#3b82b1",
    height: 40,
    borderRadius: 50,
    border: "1px solid #3b82b1",
    color: "#3b82b1",
    "&:hover": {
      backgroundColor: "#3b82b1",
      color: "#fff",
    },
  },
  allMentorsText: {
    color: "#3b82b1",
    fontFamily: "Bebas Neue",
    textDecoration: "none",
    "&:hover": {
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
  alignCenter: {
    margin: "0 auto 40px auto",
    fontFamily: "Bebas Neue",
    fontSize: 36,
    color: "#3b82b1",
  },
}));

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const languages = useSelector((state) => state.language.items);
  const loading = useSelector((state) => state.language.loading);
  const mentors = useSelector((state) => state.mentor.items);

  useEffect(() => {
    dispatch(fetchRandomMentor());
  }, [dispatch]);

  if (loading || !mentors) {
    return <Preloader />;
  } else {
    return (
      <Container>
        <Grid>
          <Grid container></Grid>
          <Grid container>
            {languages.map((lang) => {
              return (
                <Grid className={classes.allLang}>
                  <Box component="h3" m={4}>
                    <Grid item key={lang._id}>
                      <Button
                        className={classes.colorInherit}
                        variant="outlined"
                      >
                        <NavLink
                          className={classes.allMentorsText}
                          to={`/mentor/${lang._id}/language`}
                        >
                          {lang.name}
                        </NavLink>
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          <Grid container>
            {mentors.map((mentor) => {
              return (
                <CardMentor
                  avatar={mentor.avatar}
                  name={mentor.name}
                  surname={mentor.surname}
                  mentorId={mentor._id}
                />
              );
            })}
          </Grid>
          <Grid item>
            <NavLink className={classes.links} to={"/mentors/page"}>
              <Button className={classes.allMentors}>
                Показать всех менторов
              </Button>
            </NavLink>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default HomePage;

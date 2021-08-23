import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllLanguage } from "../../redux/features/language.reducer";
import { Box, Grid, Typography, makeStyles, Button } from "@material-ui/core";
import SignUpMentorDialog from "./SignUpMentorDialog";
import SignUpUserDialog from "./SignUpUserDialog";
import LoginIcon from "./LoginIcon";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { roleAndTokenRemove } from "../../redux/features/application";

const useStyles = makeStyles((theme) => {
  return {
    header: {
      borderBottom: "1px solid #3b82b1",
      padding: theme.spacing(3, 0, 3, 0),
      marginBottom: theme.spacing(9),
    },
    logoTitle: {
      fontSize: 34,
      color: "#3b82b1",
      fontFamily: "Bebas Neue",
    },
    logo: {
      width: 100,
      height: 60,
    },
    links: {
      textDecoration: "none",
    },
    privateBtn: {
      fontFamily: "Amatic SC, cursive",
      fontWeight: 800,
      fontSize: 20,
      border: "1px solid #3b82b1",
      color: "#3b82b1",
      "&:hover": {
        backgroundColor: "#3b82b1",
        color: "#fff"
      }
    },
    logoutBtn: {
      fontFamily: "Amatic SC, cursive",
      fontWeight: 800,
      fontSize: 20,
      border: "1px solid #b71212",
      color: "#b71212",
      "&:hover": {
        backgroundColor: "#b71212",
        color: "#fff"
      }
    }
  };
});

function Header() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.application.token);

  useEffect(() => {
    dispatch(fetchAllLanguage());
  }, [dispatch]);

  if (token) {
    return (
      <Box className={classes.header} component="header">
        <Grid container>
          <Grid item>
            <img className={classes.logo} src={logo} alt="" />
          </Grid>
          <Grid item xs={6}>
            <NavLink className={classes.links} to={"/"}>
              <Typography className={classes.logoTitle}>Tutor-App</Typography>
            </NavLink>
          </Grid>
          <Box style={{ marginLeft: 150 }}>
            <NavLink className={classes.links} to={"/private/page"}>
              <Button className={classes.privateBtn}>
                Личный кабинет
              </Button>
            </NavLink>
            <NavLink to={"/"} className={classes.links}>
              <Button
                className={classes.logoutBtn}
                onClick={() => dispatch(roleAndTokenRemove())}
                style={{ marginLeft: 20 }}
              >
                Выйти из аккаунта
              </Button>
            </NavLink>
          </Box>
        </Grid>
      </Box>
    );
  } else {
    return (
      <Box className={classes.header} component="header">
        <Grid container>
          <Grid item xs={7}>
            <NavLink style={{ textDecoration: "none" }} to={"/"}>
              <img src={logo} alt="" className={classes.logo} />
              <Typography className={classes.logoTitle}>Tutor-App</Typography>
            </NavLink>
          </Grid>
          <Grid item>
            <SignUpMentorDialog />
          </Grid>
          <Grid item>
            <SignUpUserDialog />
          </Grid>
          <Grid item>
            <LoginIcon />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default Header;

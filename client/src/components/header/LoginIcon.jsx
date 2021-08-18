import PersonIcon from "@material-ui/icons/Person";
import { makeStyles, Popover } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  personIcon: {
    fontSize: 35,
    marginLeft: 40,
  },
}));

function LoginIcon() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <PersonIcon onClick={handleClick} className={classes.personIcon} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <NavLink to={"/user/login/page"}>
          <Typography className={classes.typography} style={{ color: "black" }}>
            Войти как пользователь
          </Typography>
        </NavLink>

        <NavLink to={"/mentor/login/page"}>
          <Typography className={classes.typography} style={{ color: "black" }}>
            Войти как ментор
          </Typography>
        </NavLink>
      </Popover>
    </>
  );
}

export default LoginIcon;

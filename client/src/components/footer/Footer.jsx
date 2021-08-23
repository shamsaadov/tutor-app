import { Box, Grid, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    logoTitle: {
      fontSize: 34,
      color: "#3b82b1",
      "font-family": "Bebas Neue",
    },
    footer: {
      borderTop: "1px solid #3b82b1",
      padding: theme.spacing(8, 0),
      marginTop: 70
    }
  };
});

function Footer() {
  const classes = useStyles();
  return (
    <Box>
      <Grid container className={classes.footer}>
        <Grid item xs={8}>
          <Typography className={classes.logoTitle}>Tutor-App</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;

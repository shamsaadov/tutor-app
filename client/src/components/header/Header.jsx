import { Box, Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    borderBottom: "1px solid #000",
    padding: 30
  }
})

function Header() {
  const classes = useStyles()
  return (
    <Box className={classes.header}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Typography>TutorApp</Typography>
        </Grid>
        <Grid item>
          <Typography>Login as mentor</Typography>
        </Grid>
        <Grid item>
          <Typography>Login as user</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Header;

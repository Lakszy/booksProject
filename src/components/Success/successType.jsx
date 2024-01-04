import React from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  makeStyles,
  Fade,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
    background: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  card: {
    background: "rgba(255, 255, 255, 0.8)",
    padding: theme.spacing(6),
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  checkmarkContainer: {
    borderRadius: "50%",
    height: 100,
    width: 100,
    background: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  checkmarkIcon: {
    color: "#4facfe",
    fontSize: 80,
  },
  successTitle: {
    color: "#4facfe",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontWeight: 900,
    fontSize: 40,
    marginBottom: theme.spacing(2),
  },
  successText: {
    color: "#333",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontSize: 18,
    margin: 0,
  },
  orderDetails: {
    marginTop: theme.spacing(4),
  },
}));

const FancySuccessCard = ({ orderDetails }) => {
  const classes = useStyles();

  return (
      <Container className={classes.root}>
        <Paper className={classes.card}>
          <Box className={classes.checkmarkContainer}>
            <CheckCircleIcon className={classes.checkmarkIcon} />
          </Box>
          <Typography variant="h1" className={classes.successTitle}>
            Success
          </Typography>
          <Typography variant="body1" className={classes.successText}>
            We received your purchase request;<br /> we'll be in touch shortly!
          </Typography>
        </Paper>
      </Container>
  );
};

export default FancySuccessCard;

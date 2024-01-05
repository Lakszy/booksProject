import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  makeStyles,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { commerce } from "../../lib/commerce";
import Review from "./Review";
import FancySuccessCard from "../Success/successType";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: theme.spacing(4, 0),
    background: "#EBF0F5",
  },
  card: {
    background: "white",
    padding: theme.spacing(6),
    borderRadius: 4,
    boxShadow: "0 2px 3px #C8D0D8",
    display: "inline-block",
    margin: "0 auto",
  },
  checkmarkContainer: {
    borderRadius: "50%",
    height: 200,
    width: 200,
    background: "#F8FAF5",
    margin: "0 auto",
  },
  checkmarkIcon: {
    color: "#9ABC66",
    fontSize: 100,
    lineHeight: "200px",
    marginLeft: -15,
  },
  successTitle: {
    color: "#88B04B",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontWeight: 900,
    fontSize: 40,
  },
  successText: {
    color: "#404F5E",
    fontFamily: "Nunito Sans, Helvetica Neue, sans-serif",
    fontSize: 20,
    margin: 0,
  },
  orderDetails: {
    marginTop: theme.spacing(4),
  },
}));

const SuccessCard = () => {
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
          We received your purchase request;
          <br /> we'll be in touch shortly!
        </Typography>

        {orderDetails && (
          <Box className={classes.orderDetails}>
            <Typography variant="h3">Order Details:</Typography>
            <Typography variant="body1">
              Order Number: {orderDetails.orderNumber}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

const OrderConfirmation = ({ checkoutToken }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    commerce.checkout
      .capture("YOUR_ORDER_ID", {})
      .then((order) => {
        setOrderDetails({
          orderNumber: order.order_number,
        });
      })
      .catch((error) => {
        console.error("Error fetching order details:", error);
      });
  }, []);

  return (
    <div>
      <FancySuccessCard />
      <Review checkoutToken={checkoutToken} />
    </div>
  );
};

export default OrderConfirmation;

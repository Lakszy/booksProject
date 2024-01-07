const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),
  },
  card: {
    width: 300,
    margin: theme.spacing(2),
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardMedia: {
    height: 140,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px", // Adjust the height as needed
  },
  loader: {
    marginRight: theme.spacing(1),
  },
}));
import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
} from "@material-ui/core";
import { getDocs, collection, where, query } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";

const OrderHistory = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  const fetchOrderHistory = async () => {
    try {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot,"jl")

      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const calculateTotalAmount = (order) => {
    if (!order.fulfillment || !order.fulfillment.line_items || order.fulfillment.line_items.length === 0) {
      return "N/A";
    }

    const totalAmount = order.fulfillment.line_items.reduce(
      (accumulator, item) => accumulator + parseFloat(item.line_total.raw),
      0
    );

    return totalAmount.toFixed(2);
  };

  const calculateTotalQuantity = (order) => {
    if (!order.fulfillment || !order.fulfillment.line_items || order.fulfillment.line_items.length === 0) {
      return 0;
    }

    const totalQuantity = order.fulfillment.line_items.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );

    return totalQuantity;
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" style={{ marginTop: "30px" }} gutterBottom>
        Order History
      </Typography>
      {loading ? (
        <div className={classes.loadingContainer}>
          <Typography variant="h4">Loading your orders...</Typography>
          <CircularProgress className={classes.loader} size={56} />
        </div>
      ) : orders.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          No orders found.
          
        </Typography>
      ) : (
        <div className={classes.tableContainer}>
          {orders.map((order) => (
            <Card key={order.id} className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                component="img"
                alt="Order Image"
                height="140"
                // image={orders.fulfillment.line_items[0]?.image.url}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h8" gutterBottom>
                  Order ID: {order.id}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {new Date(order.id).toDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Quantity: {calculateTotalQuantity(order)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Amount: {calculateTotalAmount(order)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default OrderHistory;


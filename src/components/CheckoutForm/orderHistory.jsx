import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    margin: theme.spacing(3),
  },
  tableContainer: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  card: {
    display: "flex",
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  cardContent: {
    flex: "1 0 auto",
    width: '100%',
  },
  cardMedia: {
    width: 220,
  },
}));

const OrderHistory = () => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const {user} = useSelector(state => state.auth);

  const fetchOrderHistory = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "orders"), where("userId", "==", user.uid)));
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const calculateTotalAmount = (order) => {
    if (!order.line_items || order.line_items.length === 0) {
      return "N/A";
    }

    const totalAmount = order.line_items.reduce(
      (accumulator, item) => accumulator + parseFloat(item.line_total.raw),
      0
    );

    return totalAmount.toFixed(2);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Typography variant="h5" style={{marginTop:"30px"}} gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
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
                image={order.line_items[0].image.url}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                  Order ID: {order.line_items[0].product_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Date: {new Date(order.created).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Status: {order?.status}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total: {calculateTotalAmount(order)}
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

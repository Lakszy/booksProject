import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
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
    <div>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" gutterBottom>
          Detailed Order Data
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Order Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{calculateTotalAmount(order)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {JSON.stringify(orders)}
    </div>
  );
};

export default OrderHistory;

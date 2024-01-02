import React, { useState, useEffect } from 'react';
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import { commerce } from '../../lib/commerce';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrderHistory = async () => {
    try {
      // Fetch the user's order history from your backend or Commerce.js
      const response = await commerce.customer.getOrderHistory();
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="body2">No orders found.</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Total</TableCell>
                {/* Add more columns as needed */}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.order_number}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.order_amount.formatted_with_symbol}</TableCell>
                  {/* Add more cells as needed */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderHistory;

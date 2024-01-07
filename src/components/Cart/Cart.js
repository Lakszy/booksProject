import React, { memo } from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = memo(({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  const classes = useStyles();

  const handleEmptyCart = () => {
    // Clear the cart or perform any necessary actions to update the state
    onEmptyCart();
  };

  const renderEmptyCart = () => (
    <Typography variant="subtitle1">
      No items to show in your shopping cart,
      <Link className={classes.link} to="/"> start adding some</Link>!
    </Typography>
  );

  if (!cart.line_items || cart.line_items.length === 0) {
    return (
      <Container>
        <div className={classes.toolbar} />
        <Typography className={classes.title} variant="h5" gutterBottom>
          <b>Your Shopping Cart</b>
        </Typography>
        <hr />
        {renderEmptyCart()}
      </Container>
    );
  }

  const renderCart = () => (
    <>
      <Grid container spacing={4}>
        {cart.line_items.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem
              item={lineItem}
              onUpdateCartQty={() => onUpdateCartQty(lineItem.id, lineItem.quantity + 1)}
              onRemoveFromCart={() => onRemoveFromCart(lineItem.id, lineItem.quantity - 1)}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h5">Subtotal: <b>{cart.subtotal.formatted_with_symbol}</b></Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h5" gutterBottom>
        <b>Your Shopping Cart</b>
      </Typography>
      <hr />
      {renderCart()}
    </Container>
  );
});
export default Cart;
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CardActionArea,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { setProductIds } from "../../../Store/Ecom";

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const {productIds} = useSelector(state => state.ecom)
  const dispatch = useDispatch();

  const isAdded = productIds.includes(product.id);
  
  const handleAddToCart = () => {
    if(isAdded) return;
    onAddToCart(product.id, 1);
    dispatch(setProductIds([...productIds , product.id]))
  }

  return (
    <Card className={classes.root}>
      <Link to={`product-view/${product.id}`}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={product.media.source}
            title={product.name}
          />
        </CardActionArea>
      </Link>
      <CardContent>
        <div className={classes.cardContent}>
          <p className={classes.cardContentName}> {product.name}</p>
        </div>
        <div className={classes.cardContent}>
          <p className={classes.cardContentPrice}>
            <b>{product.price.formatted_with_symbol}</b>
          </p>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Button
          variant="contained"
          className={[classes.button, isAdded && classes.buttonAdded]}
          endIcon={!isAdded && <AddShoppingCart />}
          onClick={handleAddToCart}
        >
          {isAdded ? "Added" : "Add to Cart"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Product;

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { BsBoxSeam } from "react-icons/bs";
import { ShoppingCart, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/circles.svg";
import useStyles from "./styles";

import { useDispatch } from "react-redux";
import { logoutReducer } from "../../Store/Auth";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logoutReducer());
    history.push("/");
  };
  const handleOrders = () => {
    history.push("/ordershistory");
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h5"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="Book Store App"
              height="50px"
              className={classes.image}
            />
            <div>BoOKSBOoks</div>
          </Typography>

          <div className={classes.grow} />
          <div className={classes.button}>
            <IconButton
              component={Link}
              to="/cart"
              aria-label="Show cart items"
              color="inherit"
            >
              <Badge
                badgeContent={totalItems}
                color="secondary"
                overlap="rectangular"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.button}>
            <IconButton
              onClick={handleLogout}
              aria-label="Show cart items"
              color="inherit"
            >
              <ExitToApp />
            </IconButton>
            <Badge
              color="secondary"
              overlap="rectangular"
              style={{ paddingLeft: 4, cursor: "pointer" }}
              onClick={handleOrders}
            >
              <BsBoxSeam size={22} />
            </Badge>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;

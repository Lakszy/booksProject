import React, { useRef, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Input,
  InputAdornment
} from "@material-ui/core";

import { BsBoxSeam } from "react-icons/bs";
import { ShoppingCart, ExitToApp } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/circles.svg";
import useStyles from "./styles";
import { getSearchQuery } from "../../lib";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { logoutReducer } from "../../Store/Auth";

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchTerm , setSearchTerm  ]  = useState(() => getSearchQuery())
  const navRef = useRef(null);

  const handleLogout = () => {
    dispatch(logoutReducer());
    history.push("/");
  };
  const handleOrders = () => {
    history.push("/ordershistory");
  };

  const handleInputClick = () => {
    navRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log('SEARCH PAGE')
    const term = getSearchQuery();
    console.log('SEARCH TERM TERM',term)
    setSearchTerm(term);
  }, [])

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      //reload the page with the search term
      history.push(`/search?q=${searchTerm}`)
      window.location.reload();
    }
  }


  return (
    <div ref={navRef} >
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
            <div>BNV BOOKS</div>
          </Typography>

          <Input
            className={classes.searchb}
            type="text"
            placeholder="Which book are you looking for?"
            defaultValue={searchTerm }
            onClick={handleInputClick}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
            onKeyPress={handleEnter}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />

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
              component={Link}
              to="/ordershistory"
              aria-label="Show cart items"
              color="inherit"
            >
              <BsBoxSeam size={22} />
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
          
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;

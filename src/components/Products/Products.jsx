// Products.jsx

import React, { useState, useRef } from "react";
import {
  Grid,
  InputAdornment,
  Input,
  MenuItem,
  Select,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "./Product/Product.js";
import useStyles from "./styles";
import "../ProductView/style.css";
import { Link } from "react-router-dom";
import mangaBg from "../../assets/maxresdefault.jpg";
import bioBg from "../../assets/biography.jpg";
import fictionBg from "../../assets/fiction.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Products = ({ products, onAddToCart, featureProducts }) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortedProducts, setSortedProducts] = useState([...products]);
  const sectionRef = useRef(null);

  const handleInputClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleSort = () => {
    const updatedSortedProducts = [...products];
    updatedSortedProducts.sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
    setSortOption("alphabetical");
    setSortedProducts(updatedSortedProducts);
  };

  const handleGenreFilter = (genre) => {
    console.log("Selected Genre:", genre);
    setSelectedGenre(genre);
  };

  const filteredProducts = sortedProducts.filter((product) => {
    const includesTitle = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const includesGenre =
      selectedGenre === "all" ||
      product.categories.some((category) => category.slug === selectedGenre);
    console.log("Product:", product);

    return includesTitle && includesGenre;
  });

  return (
    <main className={classes.mainPage}>
      <div className={classes.toolbar} />
      <div className={classes.hero}>
        <div className={classes.heroCont}>
          <h1 className={classes.heroHeader}>BoOKS BOoKS!</h1>
          <h3 className={classes.heroDesc} ref={sectionRef}>
            WE ALL ARE BOOKWORMS👾
          </h3>
          <div className={classes.searchs}>
            <Input
              className={classes.searchb}
              type="text"
              placeholder="Which book are you looking for?"
              onClick={handleInputClick}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <div
              style={{ display: "inline-block", marginLeft: "10px" }}
              className={classes.sortDropdown}
            >
              <Select
                value={selectedGenre}
                onChange={(e) => handleGenreFilter(e.target.value)}
              >
                <MenuItem value="all">All Genres</MenuItem>
                <MenuItem value="manga">Manga</MenuItem>
                <MenuItem value="biography">Biography</MenuItem>
                <MenuItem value="fiction">Fiction</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {searchTerm === "" && (
        <div className={classes.categorySection}>
          <h1 className={classes.categoryHeader}>Categories</h1>
          <h3 className={classes.categoryDesc}>
            Browse our featured categories
          </h3>
          <div className={classes.buttonSection}>
            <div>
              <Link to="manga">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${mangaBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Manga</div>
            </div>
            <div>
              <Link to="biography">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${bioBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Biography</div>
            </div>
            <div>
              <Link to="fiction">
                <button
                  className={classes.categoryButton}
                  style={{ backgroundImage: `url(${fictionBg})` }}
                ></button>
              </Link>
              <div className={classes.categoryName}>Fiction</div>
            </div>
          </div>
        </div>
      )}

      <div className={classes.carouselSection}>
        <Carousel
          showThumbs={false}
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
        >
          <div>
            <Link to="manga">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${mangaBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Manga</div>
          </div>
          <div>
            <Link to="biography">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${bioBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Biography</div>
          </div>
          <div>
            <Link to="fiction">
              <button
                className={classes.categoryButton}
                style={{ backgroundImage: `url(${fictionBg})` }}
              ></button>
            </Link>
            <div className={classes.categoryName}>Fiction</div>
          </div>
        </Carousel>
      </div>

      {searchTerm === "" && (
        <>
          <div>
            <h3 className={classes.contentHeader}>
              Best <span style={{ color: "#f1361d" }}>Sellers</span>
            </h3>
            <div style={{ margin: "10px" }} className={classes.sortDropdown}>
              <Select
                value={sortOption}
                onChange={(e) => handleSort(e.target.value)}
              >
                <MenuItem value="default">Default Sorting</MenuItem>
                <MenuItem value="alphabetical">Sort Alphabetically</MenuItem>
              </Select>
            </div>
            <Grid className={classes.content} container spacing={2}>
              {filteredProducts.map((product) => (
                <Grid
                  className={classes.content}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  key={product.id}
                >
                  <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
              ))}
            </Grid>
          </div>
        </>
      )}
    </main>
  );
};

export default Products;

import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  InputAdornment,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Product from "../Products/Product/Product";
import { Link } from "react-router-dom";
import mangaBg from "../../assets/maxresdefault.jpg";
import bioBg from "../../assets/biography.jpg";
import fictionBg from "../../assets/fiction.jpg";
import { Carousel } from "react-responsive-carousel";
import { commerce } from '../../lib/commerce';

// Define the Products component
const Products = ({ onAddToCart, featureProducts }) => {
  // Use the styles defined in the styles.js file
  const classes = useStyles();
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to manage the sort option
  const [sortOption, setSortOption] = useState("default");
  // State to manage the sorted products
  const [sortedProducts, setSortedProducts] = useState([]);
  // Reference to the section for smooth scrolling
  const sectionRef = useRef(null);

  // useEffect hook to fetch products from Commerce.js when the component mounts
  useEffect(() => {
    // Fetch products from Commerce.js using the imported commerce object
    commerce.products.list().then((response) => {
      setSortedProducts(response.data);
    });
  }, []);

  // Function to handle smooth scroll to the search section
  const handleInputClick = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle sorting of products
  const handleSort = (option) => {
    // Create a copy of the sorted products array
    let updatedSortedProducts = [...sortedProducts];
    // Sort the products based on the selected option
    if (option === "alphabetical") {
      updatedSortedProducts.sort((a, b) => {
        const titleA = a.name || "";
        const titleB = b.name || "";
        return titleA.localeCompare(titleB);
      });
      // Update the sort option state
      setSortOption("alphabetical");
    } else {
      // If the default option is selected, update the sort option state
      setSortOption("default");
    }
    // Update the state with the sorted products
    setSortedProducts(updatedSortedProducts);
  };

  // Render the main component
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
          </div>
          <div className={classes.sortDropdown}>
            <Select
              value={sortOption}
              onChange={(e) => handleSort(e.target.value)}
            >
              <MenuItem value="default">Default Sorting</MenuItem>
              <MenuItem value="alphabetical">Sort Alphabetically</MenuItem>
            </Select>
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
        {/* <Carousel
        showThumbs={false}
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
        > */}


        </div>
    </main>
  );
};

// Export the Products component
export default Products;

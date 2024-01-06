import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { CircularProgress, CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import ProductView from "./components/ProductView/ProductView";
import Manga from "./components/Manga/Manga";
import Fiction from "./components/Fiction/Fiction";
import Biography from "./components/Bio/Biography";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { setCartReducer } from "./Store/Ecom";
import { doc, collection, getDocs, setDoc } from "firebase/firestore";
import { db } from "./lib/firebase";
import OrderHistory from "./components/CheckoutForm/orderHistory";

const ProductComp = ({ handleAddToCart, handleUpdateCartQty }) => {
  const [products, setProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);

  const departmentRef = collection(db, "Orders");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    // const docSnap = await getDocs(departmentRef);
    // console.log('DOC SNAP', docSnap.docs.map(doc => doc.data()));
    // setDoc(doc(departmentRef, 'Department1234'), {
    //   name: 'Department1234',
    //   description: 'department hai bhaiya',
    //   image: 'Department1234',
    //   slug: 'Department1234',
    // })
    setProducts(data);
  };

  const fetchCategoryProducts = async (category, stateSetter) => {
    const { data } = await commerce.products.list({
      category_slug: [category],
    });
    stateSetter(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoryProducts("featured", setFeatureProducts);
  }, []);

  if (!products.length)
    return (
      <div
        style={{
          paddingTop: 100,
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <h1>Loading Products Please Wait</h1>
        <CircularProgress />
      </div>
    );
  return (
    <Products
      key={products.id}
      products={products}
      featureProducts={featureProducts}
      onAddToCart={handleAddToCart}
      handleUpdateCartQty={handleUpdateCartQty}
    />
  );
};

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.ecom);

  const setCart = (payload) => {
    console.log("BEFORE SETTING CART", payload);
    dispatch(setCartReducer(payload));
  };

  const fetchCategoryProducts = async (category, stateSetter) => {
    const { data } = await commerce.products.list({
      category_slug: [category],
    });
    stateSetter(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const handleLogin = () => {
    commerce.customer
      .login("binova1245@gmail.com", "http://localhost:3000/login/callback")
      .then((token) => console.log("TOKEN GOES HERE", token));
  };

  useEffect(() => {
    handleLogin();
    fetchCategoryProducts("manga", setMangaProducts);
    fetchCategoryProducts("fiction", setFictionProducts);
    fetchCategoryProducts("biography", setBioProducts);
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div>
      <>
        <Router>
          <div style={{ display: "flex" }}>
            <CssBaseline />
            <Navbar
              totalItems={cart.total_items}
              handleDrawerToggle={handleDrawerToggle}
            />
            <Suspense
              fallback={
                <div style={{ fontSize: "3rem", fontFamily: "fantasy" }}>
                  Loading Products Please Wait
                </div>
              }
            >
              <Switch>
                <Route path="/" exact>
                  {isLoggedIn ? (
                    <ProductComp
                      handleAddToCart={handleAddToCart}
                      handleUpdateCartQty={handleUpdateCartQty}
                    />
                  ) : (
                    <Login />
                  )}
                </Route>
                <Route
                  path="/signup"
                  exact
                  render={() => isLoggedIn && <Redirect to="/" />}
                >
                  <Signup />
                </Route>
                <Route path="/ordershistory">
                  <OrderHistory />
                </Route>
                <Route path="/products">
                  <ProductComp
                    handleAddToCart={handleAddToCart}
                    handleUpdateCartQty={handleUpdateCartQty}
                  />
                </Route>

                <Route exact path="/cart">
                  <Cart
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                </Route>
                <Route path="/checkout" exact>
                  <Checkout
                    cart={cart}
                    order={order}
                    onCaptureCheckout={handleCaptureCheckout}
                    error={errorMessage}
                  />
                </Route>
                <Route path="/product-view/:id" exact>
                  <ProductView />
                </Route>
                <Route path="/manga" exact>
                  <Manga
                    mangaProducts={mangaProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/fiction" exact>
                  <Fiction
                    fictionProducts={fictionProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
                <Route path="/biography" exact>
                  <Biography
                    bioProducts={bioProducts}
                    onAddToCart={handleAddToCart}
                    handleUpdateCartQty
                  />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </Router>
      </>
      )
    </div>
  );
};

export default App;

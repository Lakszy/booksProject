import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { CssBaseline } from "@material-ui/core";
import { commerce } from "./lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import loadingImg from "./assets/loader.gif";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/SignUp";

const Products = lazy(() => import("./components/Products/Products"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Checkout = lazy(() => import("./components/CheckoutForm/Checkout/Checkout"));
const ProductView = lazy(() => import("./components/ProductView/ProductView"));
const Manga = lazy(() => import("./components/Manga/Manga"));
const Fiction = lazy(() => import("./components/Fiction/Fiction"));
const Biography = lazy(() => import("./components/Bio/Biography"));

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [mangaProducts, setMangaProducts] = useState([]);
  const [fictionProducts, setFictionProducts] = useState([]);
  const [bioProducts, setBioProducts] = useState([]);
  const [featureProducts, setFeatureProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
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
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategoryProducts("manga", setMangaProducts);
    fetchCategoryProducts("featured", setFeatureProducts);
    fetchCategoryProducts("fiction", setFictionProducts);
    fetchCategoryProducts("biography", setBioProducts);
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const MemoizedProducts = useMemo(
    () => (
      <Products
        products={products}
        featureProducts={featureProducts}
        onAddToCart={handleAddToCart}
        handleUpdateCartQty={handleUpdateCartQty}
      />
    ),
    [products, featureProducts, handleAddToCart, handleUpdateCartQty]
  );

  return (
    <div>
      {products.length > 0 ? (
        <>
          <Router>
            <div style={{ display: "flex" }}>
              <CssBaseline />
              <Navbar totalItems={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route path="/" exact>
                    <Login />
                  </Route>
                  <Route path="/signup" exact>
                    <Signup />
                  </Route>
                  <Route path="/products">
                    {MemoizedProducts}
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
                    <Manga mangaProducts={mangaProducts} onAddToCart={handleAddToCart} handleUpdateCartQty />
                  </Route>
                  <Route path="/fiction" exact>
                    <Fiction fictionProducts={fictionProducts} onAddToCart={handleAddToCart} handleUpdateCartQty />
                  </Route>
                  <Route path="/biography" exact>
                    <Biography bioProducts={bioProducts} onAddToCart={handleAddToCart} handleUpdateCartQty />
                  </Route>
                </Switch>
              </Suspense>
            </div>
          </Router>
        </>
      ) : (
        <div className="loader">
          <img src={loadingImg} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default App;

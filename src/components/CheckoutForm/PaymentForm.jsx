import React, { useState } from "react";
import {
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import Review from "./Review";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../Store/Ecom";

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const handlePayOnDelivery = async () => {
    const orderId = new Date().toISOString();
    const orderRef = doc(db, "orders", orderId);

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: "International",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: "manual",
        manual: {
          id: "pay_on_delivery",
        },
      },
      userUid: user.uid,
    };

    try {
      setLoading(true);

      await setDoc(doc(db, "orders", orderId), orderData);
      dispatch(emptyCart());
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    } catch (error) {
      console.error("Error storing order in Firestore:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p>User ID: {user.uid}</p>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pay on Delivery
      </Typography>
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePayOnDelivery}
          style={{ backgroundColor: "#001524", color: "#FFFF" }}
          disabled={loading}
        >
          {loading ? (
            <div>
              Pay on Delivery
              <CircularProgress size={24} color="inherit" />
            </div>
          ) : (
            "Pay on Delivery"
          )}
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;

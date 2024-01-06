import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import Review from "./Review";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../Store/Ecom";
import {v4} from 'uuid';

const PaymentForm = ({
  checkoutToken,
  nextStep,
  backStep,
  shippingData,
  onCaptureCheckout,
}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleConfirmOrder = async () => {
    const orderId = v4();
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
      userId : user.uid
    };

    try {
      const orderResp = await setDoc(doc(db, "orders", orderId), orderData);
      console.log('ORDER RESP', orderResp)
      dispatch(emptyCart()); 
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    } catch (error) {
      console.error("Error storing order in Firestore:", error);
    }
  };

  return (
    <>
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
          onClick={handleConfirmOrder}
          style={{ backgroundColor: "#001524", color: "#FFFF" }}
        >
          Complete Purchase
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;

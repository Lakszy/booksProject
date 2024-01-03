import React from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import Review from './Review';
import { db } from '../../lib/firebase'; 
import { collection } from 'firebase/firestore';

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {
  const handlePayOnDelivery = async () => {
    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      },
      shipping: {
        name: 'International',
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'manual',
        manual: {
          id: 'pay_on_delivery',
        },
      },
    };

   
  
    try {
      const orderRef = collection(db,'orders', orderData)
      console.log('Order stored in Firestore with ID:', orderRef.id);
      
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    } catch (error) {
      console.error('Error storing order in Firestore:', error);
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Typography variant="body1" gutterBottom>
        Pay on Delivery
      </Typography>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={backStep}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handlePayOnDelivery}
          style={{ backgroundColor: '#001524', color: '#FFFF' }}
        >
          Pay on Delivery
        </Button>
      </div>
    </>
  );
};

export default PaymentForm;
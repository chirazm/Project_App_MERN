import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PaymentMethodScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        };
    }, [shippingAddress, navigate])
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod)); //cartActions
    navigate('/placeorder');
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler} style={{maxWidth: "400px"}}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>        
            <div>
                <input
                style={{marginLeft: "-60px"}}
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal" style={{marginLeft: "-180px"}}>PayPal</label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <input 
            style={{marginLeft: "-60px"}}
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe" style={{marginLeft: "-180px"}}>Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit" style={{marginLeft: "90px"}}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
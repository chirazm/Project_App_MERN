import CheckoutSteps from "../components/CheckoutSteps";
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen(){
    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const { userInfo } = userSignin;
    useEffect(() => {
        if (!userInfo) {
            navigate('/signin');
          };
    }, [navigate, userInfo]) 
    const [fullName, setFullName]= useState(shippingAddress.fullName);
    const [address, setAddress]= useState(shippingAddress.address);
    const [city, setCity]= useState(shippingAddress.city);
    const [postalCode, setPostalCode]= useState(shippingAddress.postalCode);
    const [country, setCountry]= useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        navigate('/payment');
    }
    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler} style={{maxWidth: "500px"}}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName" style={{marginLeft : "30px"}}> Full Name</label>
                    <input 
                        style={{marginLeft : "27px"}}
                        type="text" 
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e)=> setFullName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="address" style={{marginLeft : "30px"}}> Address</label>
                    <input 
                        style={{marginLeft : "27px"}}
                        type="text" 
                        id="address"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e)=> setAddress(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="city" style={{marginLeft : "30px"}}> City</label>
                    <input 
                        style={{marginLeft : "27px"}}
                        type="text" 
                        id="city"
                        placeholder="Enter your city"
                        value={city}
                        onChange={(e)=> setCity(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="postalCode" style={{marginLeft : "30px"}}> Postal Code</label>
                    <input 
                        style={{marginLeft : "27px"}}
                        type="text" 
                        id="postalCode"
                        placeholder="Enter your postal code"
                        value={postalCode}
                        onChange={(e)=> setPostalCode(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="country" style={{marginLeft : "30px"}}> Country</label>
                    <input 
                        style={{marginLeft : "27px"}}
                        type="text" 
                        id="country"
                        placeholder="Enter your country"
                        value={country}
                        onChange={(e)=> setCountry(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit" style={{marginLeft : "130px"}}>
                        Continue
                    </button>
                </div>
             </form>
        </div>
        
    )
}
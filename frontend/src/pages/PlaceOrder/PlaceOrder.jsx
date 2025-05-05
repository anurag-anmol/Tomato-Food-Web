import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./PlaceOrder.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

export default function PlaceOrder() {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }


    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        })
        console.log(orderItems);

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        }
        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
        if (response.data.success) {
            const { session_url } = response.data;
            window.location.href(session_url);
        }
        else {
            alert("Error...")
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/cart");
        }
        else if (getTotalCartAmount === 0) {
            navigate("/cart")
        }
    }, [token])


    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-field">
                    <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Enter Your First Name' />
                    <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Enter Your Last Name' />
                </div>
                <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your Email' />
                <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Enter Your Street' />
                <div className="multi-field">
                    <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='Enter Your City' />
                    <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='Enter Your State' />
                </div>
                <div className="multi-field">
                    <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Enter Your Zip code' />
                    <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Enter Your Country' />
                </div>
                <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text " placeholder="Enter Your Phone Number" />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-detail">
                            <p>SubTotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-detail">
                            <p>Delivery fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-detail">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button type='submit'>PROCEED TO PAYMENT</button>
                </div>
            </div>

        </form>
    )
}

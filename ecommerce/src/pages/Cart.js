import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } from '../redux/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartItems, cartTotalAmount } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const handleRemovefromcart = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    const handleIncreasecart = (cartItem) => {
        dispatch(addToCart(cartItem));
    };
    
    const handleDecreasecart = (cartItem) => {
        dispatch(decreaseCart(cartItem));
    };
    
    const handleClearcart = () => {
        dispatch(clearCart());
    };
 
    useEffect(() => { 
        dispatch(getTotals());
    }, [cartItems, dispatch]);

    return (
        <div>
            <h2>Products Cart</h2>
            <div> 
                {cartItems.length === 0 ? 
                    <div>
                        <p>Your cart is empty</p>
                        <Link to='/'>
                        <button>Continue shopping</button>
                        </Link>
                    </div> : 
                    <div>
                        <div>
                            <h2>PRODUCT</h2>
                            <h2>PRICE</h2>
                            <h2>QUANTITY</h2>
                            <h2>TOTAL</h2>
                        </div> 
                        <div>
                            {cartItems.map(cartItem => (
                                <div key={cartItem.id}>
                                    <div>
                                        <img src={cartItem.image} alt={cartItem.name} />
                                        <h3>{cartItem.name}</h3>
                                        <p>{cartItem.desc}</p>
                                        <button onClick={() => handleRemovefromcart(cartItem)}>Remove</button>
                                    </div>
                                    <div>{cartItem.price}</div>
                                    <div>
                                        <button onClick={() => handleDecreasecart(cartItem)}>-</button>
                                        <div>{cartItem.quantity}</div>
                                        <button onClick={() => handleIncreasecart(cartItem)}>+</button>
                                    </div>
                                    <div>{cartItem.price * cartItem.quantity}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleClearcart}>Clear Cart</button>
                        <div>{cartTotalAmount}</div>
                        <Link to='/'>
                        <button>Continue shopping</button>
                        </Link><section></section>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;

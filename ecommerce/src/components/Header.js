import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotals } from '../redux/cartSlice';

const Header = () => {
    const { cartItems, cartTotalQuantity } = useSelector(state => state.cart);
    
    const dispatch = useDispatch();

    useEffect(() => { 
        dispatch(getTotals());
    }, [cartItems, dispatch]);


    return (
        <div style={{
            backgroundColor: 'grey',
            display: 'flex',
            justifyContent: 'space-between',
            height: '80px',
            alignItems: 'center',
            padding: '0 30px',
            position: 'sticky',
            width: '100%'
        }}>
            <div>
                <h2>CareerKings</h2>
            </div>
            <div>
                <Link to="/cart" style={{
             color: 'white',
             textDecoration: 'none',
             fontWeight: 'bold',
             display: 'flex',
             alignItems: 'center'
}}>
                    Cart <span style={{
            marginLeft: '5px'
        }}>{cartTotalQuantity}</span>
                </Link>
            </div>
        </div>
    );
};



export default Header;

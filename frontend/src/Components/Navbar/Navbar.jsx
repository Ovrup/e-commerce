import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import user_icon from '../Assets/user_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import useLocalStorage from '../../hooks/useLocalStorage';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItem } = useContext(ShopContext);
    const navigate = useNavigate();
    const { getItem, clearLocalStorage } = useLocalStorage();
    const username = getItem('username')

    function logout() {
        clearLocalStorage();
        navigate('/login')
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="" />
                <p>Shopper's Stop</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => setMenu("shop")}>
                    <Link to="/">Shop</Link>
                    {menu === "shop" && <hr />}
                </li>
                <li onClick={() => setMenu("men")}>
                    <Link to="/mens">Men</Link>
                    {menu === "men" && <hr />}
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link to="/womens">Women</Link>
                    {menu === "women" && <hr />}
                </li>
                <li onClick={() => setMenu("kid")}>
                    <Link to="/kids">Kid</Link>
                    {menu === "kid" && <hr />}
                </li>
                <li onClick={() => setMenu("electronic")}>
                    <Link to="/electronic">Electronic Item</Link>
                    {menu === "electronic" && <hr />}
                </li>
            </ul>

            <div className='navbar-user-logout'>
                <div className='navbar-user'>
                    <img src={user_icon} alt='' width={25} height={25} />
                    <span>{username}</span>
                </div>
                <button className='nav-logout-btn' onClick={logout}>Logout</button>
            </div>
            <div className='nav-cart'>
                <Link to="/cart" className='cart-link'>
                    <img src={cart_icon} alt="" />
                    Cart
                </Link>
                <div className='nav-cart-count'>{getTotalCartItem()}</div>
            </div>
        </div>
    )
}

export default Navbar;

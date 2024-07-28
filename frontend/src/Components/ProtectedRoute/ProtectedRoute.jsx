import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ShopContextProvider from '../../Context/ShopContext';
import useLocalStorage from '../../hooks/useLocalStorage';

const ProtectedRoute = () => {
    const { getItem } = useLocalStorage()
    const isLoggedIn = getItem('isLoggedIn');
    const token = getItem('auth_token');

    if (!isLoggedIn || !token) return <Navigate to='/login' />

    return (
        <ShopContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
        </ShopContextProvider>
    )
}

export default ProtectedRoute;
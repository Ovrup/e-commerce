import React, { useState, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { getAllProducts, getCart, addToCartApi, removeFromCartApi } from "../apis/methods";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const { getItem } = useLocalStorage()

    const fetchProducts = async () => {
        const response = await getAllProducts();
        setProducts(response.data)
    }

    const fetchCartData = async () => {
        const response = await getCart();
        setCartItems(response.cart)
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    // Fetch User cart data

    useEffect(() => {
        fetchCartData()
    }, [])

    const addToCart = async (itemId) => {
        setCartItems((prev) => {
            return { ...prev, [itemId]: prev[itemId] + 1 }
        });

        const cartData = await addToCartApi(itemId);
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            return { ...prev, [itemId]: prev[itemId] - 1 }
        });

        const response = await removeFromCartApi(itemId);
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;

        if (cartItems.length === 0 || products.length === 0) return;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((p) => p.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }

        return totalAmount.toFixed(2);
    }

    const getTotalCartItem = () => {
        let totalItem = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item]
            }
        }

        return totalItem
    }

    const contextValue = { products, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItem }

    return <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
}

export default ShopContextProvider;
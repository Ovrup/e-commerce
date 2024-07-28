import { Apis } from "./index.js";

export const userLogin = async (formData) => {
    const loginResponse = await fetch(Apis["login"](), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const parsedResponse = await loginResponse.json();

    return parsedResponse
}

export const userSignup = async (formData) => {
    const signupResponse = await fetch(Apis["signup"](), {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });
    const parsedResponse = await signupResponse.json();

    return parsedResponse
}

export const getAllProducts = async () => {
    const response = await fetch(Apis["get-all-products"]());
    const parsedResponse = await response.json();

    return parsedResponse
}

export const getCart = async () => {
    const response = await fetch(Apis['get-cart'](), {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth_token')
        }
    });
    const parsedResponse = await response.json();

    return parsedResponse
}

export const addToCartApi = async (itemId) => {
    const response = await fetch(Apis['add-to-cart'](itemId), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth_token')
        }
    });
    const parsedResponse = await response.json();

    return parsedResponse;
}

export const removeFromCartApi = async (itemId) => {
    const response = await fetch(Apis['remove-from-cart'](itemId), {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('auth_token')
        }
    });
    const cartData = await response.json();

    return cartData
}
const { REACT_APP_BASE_URL } = process.env

export const Apis = {
    'login': () => `${REACT_APP_BASE_URL}user/login`,
    'signup': () => `${REACT_APP_BASE_URL}user/signup`,
    'get-all-products': () => `${REACT_APP_BASE_URL}products/`,
    'get-cart': () => `${REACT_APP_BASE_URL}cart`,
    'add-to-cart': (itemId) => `${REACT_APP_BASE_URL}cart/addToCart/${itemId}`,
    'remove-from-cart': (itemId) => `${REACT_APP_BASE_URL}cart/removeFromCart/${itemId}`
}
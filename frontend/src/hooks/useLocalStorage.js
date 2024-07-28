import React, { useState } from 'react';

const useLocalStorage = () => {

    function getItem(key) {
        return localStorage.getItem(key)
    }

    function setItem(key, value) {
        localStorage.setItem(key, value)
    }

    function removeItem(key) {
        localStorage.removeItem(key)
    }

    function clearLocalStorage() {
        localStorage.clear()
    }


    return { getItem, setItem, removeItem, clearLocalStorage }

}

export default useLocalStorage;
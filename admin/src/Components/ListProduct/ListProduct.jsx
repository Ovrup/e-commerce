import React, { useState, useEffect } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

    const [allProducts, setAllProducts] = useState([]);

    async function fetchProducts() {
        try {
            const products = await fetch('https://e-commerce-a9wp.onrender.com/api/products/');
            const parsedData = await products.json();
            setAllProducts(parsedData.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    const removeProduct = async (id) => {
        const deleteProduct = await fetch(`https://e-commerce-a9wp.onrender.com/api/products/deleteProduct/${id}`, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const parsedResponse = await deleteProduct.json();
        if (parsedResponse.success) {
            fetchProducts()
        }
    }

    return (
        <div className='list-product'>
            <h1>All Products List</h1>
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allProducts.map((product, idx) => {
                    return <><div key={product._id} className='listproduct-format-main listproduct-format'>
                        <img src={product.image} alt="" className="product-icon" />
                        <p>{product.name}</p>
                        <p>${product.old_price}</p>
                        <p>${product.new_price}</p>
                        <p>{product.category}</p>
                        <img onClick={() => removeProduct(product.id)} className='listproduct-removeicon' src={cross_icon} alt='' />
                    </div>
                        <hr />
                    </>
                })}
            </div>
        </div>
    )
}

export default ListProduct
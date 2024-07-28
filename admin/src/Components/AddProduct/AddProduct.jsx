import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg'

// http://localhost:4000/api
// https://e-commerce-a9wp.onrender.com

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const uploadImage = async (image) => {
        let formdata = new FormData();

        formdata.append('product', image);

        const uploadedImage = await fetch('https://e-commerce-a9wp.onrender.com/images/upload',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formdata
            });
        const parsedResponse = await uploadedImage.json();
        return parsedResponse
    }

    const addProduct = async () => {
        const product = { ...productDetails };
        const response = await uploadImage(image);

        if (response.success) {
            product.image = response.image_url
        }

        try {
            const newProduct = await fetch('https://e-commerce-a9wp.onrender.com/products/addProduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            const parsedProduct = await newProduct.json();

        } catch (err) {
            console.error("Error: ", err)
        }


    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p className="product-title">Product Title</p>
                <input value={productDetails.name} type="text" name="name" placeholder='Type Here' onChange={changeHandler} />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} type="text" name="old_price" placeholder='Type here' onChange={changeHandler} />
                </div>

                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} type="text" name="new_price" placeholder='Type here' onChange={changeHandler} />
                </div>
            </div>

            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} name='category' className='addproduct-selector' onChange={changeHandler}>
                    <option value='women'>Women</option>
                    <option value='men'>Men</option>
                    <option value='kid'>Kid</option>
                    <option value='electronic'>Electronics</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor='file-input'>
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumnail-img' alt='' />
                </label>
                <input value={productDetails.image} type="file" name='image' id='file-input' hidden onChange={imageHandler} />
            </div>
            <button onClick={addProduct} className='addproduct-btn'>ADD</button>
        </div>
    )
}

export default AddProduct
import React, { useState } from 'react';
import { storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg'
import Loader from '../Loader/Loader';

const { VITE_APP_BASE_URL } = import.meta.env

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: "",
    })
    const [loading, setLoading] = useState(false)

    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const uploadImage = async (image) => {
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, image);
        const url = await getDownloadURL(snapshot.ref);
        return url
    }

    const addProduct = async () => {
        setLoading(true)
        const product = { ...productDetails };
        const url = await uploadImage(image);

        if (url) {
            product.image = url;
        }

        try {
            const newProduct = await fetch(VITE_APP_BASE_URL + 'products/addProduct', {
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
        } finally {
            setLoading(false);
            setProductDetails({
                name: "",
                image: "",
                category: "women",
                new_price: "",
                old_price: "",
            });
            setImage(null);
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

            {loading && <Loader />}
        </div>
    )
}

export default AddProduct
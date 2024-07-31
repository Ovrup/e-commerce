import React from 'react';
import loader from '../../assets/loader.svg';
import './Loader.css'

const Loader = () => {
    return (
        <div className='loader'>
            <img src={loader} />
        </div>
    )
}

export default Loader
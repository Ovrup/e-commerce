import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import useLocalStorage from '../hooks/useLocalStorage';
import { userLogin, userSignup } from '../apis/methods';

const LoginSignup = () => {
    const [state, setState] = useState('Login');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { setItem } = useLocalStorage()

    function isButtonDisabled() {
        if (formData.email === "" || formData.password === "") {
            return true
        }
        else {
            return false
        }
    }

    function handleChange(e) {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    async function login() {
        const loginResponse = await userLogin(formData)
        if (loginResponse.success && loginResponse.token) {
            setItem("isLoggedIn", true);
            setItem('auth_token', loginResponse.token);
            setItem('username', loginResponse.username);
            navigate("/");
        }
    }

    async function signup() {

        const signupResponse = await userSignup(formData);

        if (signupResponse.success && signupResponse.token) {
            setItem("isLoggedIn", true);
            setItem('auth_token', signupResponse.token);
            setItem('username', signupResponse.username);
            navigate("/");
        }
    }

    function toggleState(state) {
        setState(state);
        setFormData({
            name: "",
            email: "",
            password: ""
        })
    }

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Signup" ?
                        <input name="name" value={formData.name} type="text" placeholder='Your Name' onChange={handleChange} />
                        : <></>}
                    <input name="email" value={formData.email} type="email" placeholder='Email Address' onChange={handleChange} />
                    <input name="password" value={formData.password} type="password" placeholder='Password' onChange={handleChange} />
                </div>
                <button onClick={() => state === "Login" ? login() : signup()} disabled={isButtonDisabled()}>Continue</button>
                {state === "Signup" ? <p className="loginsignup-login">
                    Already Have an account? <span onClick={() => toggleState("Login")}>Login here</span>
                </p>
                    : <p className="loginsignup-login">
                        Don't have any account? <span onClick={() => toggleState("Signup")}>Signup here</span>
                    </p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id="" />
                    <p>By continuing, I agree to the terms of use & privacy policy </p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
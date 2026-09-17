import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "./../services/api.js";
export default function Login({isLogin,setLoginId,setIslogin,setToken,token}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const[isValid,setIsValid] = useState(true);
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmail(formData.email);
        setPassword(formData.password);
        //    setFormData((prev)=>({
        //     email: '',
        //     password: ''
        //    }))

        try {
            const result = await api.post('/users/login', {
                email: formData.email,
                password: formData.password
            })
            if (result.data.status === "success") {
                setToken(result.data.token);
                alert("Logged in successfull");
                setLoginId(result.data.id);
                setIslogin(true);
                navigate("/");
            }

        } catch (err) {
            console.log(err.status);
            if(err.status==400){
                setIsValid(false);
            }
            console.log("Login failed", err.response?.data);
        }
    };
    return (
        <div className="loginpage">
            <div className="login-container">
                <h2>Welcome Back</h2>
                <form className="login-form" onSubmit={handleSubmit}>

                    <div className="input-group1">
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={formData.email ? 'has-text' : ''}
                            autoComplete="off"
                            required
                        />
                        <label htmlFor="email">Email Address</label>
                    </div>

                    <div className="input-group1">
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={formData.password ? 'has-text' : ''}
                            required
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button type="submit" className="login-btn">Log In</button>
                    {!isValid && (<h2>Email or password was wrong</h2>)}
                </form>
                
                <div className="signupinlogin">
                    <h2>Don't have a account create one here⬇️</h2>
                    <div className="signdiv">
                    <Link to="/signup" className="signupinloginbutton">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

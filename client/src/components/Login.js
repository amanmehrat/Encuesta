import React, { useState, useEffect } from 'react';
import SignUpImage from '../assets/images/signup-image.jpg'
import { Person, Email, Lock } from '@material-ui/icons';

import { useSelector, useDispatch } from 'react-redux';
import allActions from '../action';


import "../assets/css/style.css";
import "./login.css";
const Login = () => {
    const authError = useSelector(state => state.auth.error);
    const [isSignUp, setIsSignUp] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const dispatch = useDispatch();

    const changeAuth = (event) => {
        event.preventDefault();
        setIsSignUp(() => setIsSignUp(!isSignUp))
        setUser({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted(true);
        if (isSignUp) {
            if (user.name && user.email && user.password && user.confirmPassword) {
                if (validation(user)) {
                    dispatch(allActions.userActions.RegisterUser(user));
                }
            }
        } else {
            if (user.email && user.password) {
                if (validation(user)) {
                    dispatch(allActions.userActions.LoginUser(user.email, user.password));
                }
            }
        }
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value })
    };

    const validation = (user) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(user.email).toLowerCase())) {
            setError("Please Enter Correct Email");
            return false;
        } else if (isSignUp && user.password != user.confirmPassword) {
            setError("Password doesn't match.");
            return false;
        }
        setError("");
        return true;
    }

    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">{isSignUp ? "Sign up" : "Sign in"}</h2>
                            {authError && <div>{authError}</div>}
                            <form method="POST" className="register-form" onSubmit={handleSubmit}>
                                {error && <div>{error}</div>}
                                {isSignUp &&
                                    <div className="form-group">
                                        <label htmlFor="name"><Person /></label>
                                        <input type="text" name="name" onChange={handleChange} placeholder="Your Name" value={user.name} className="pad-left-15" />
                                        {submitted && !user.name && <div>Name is required</div>}
                                    </div>
                                }
                                <div className="form-group">
                                    <label htmlFor="email"><Email /></label>
                                    <input type="text" name="email" onChange={handleChange} placeholder="Your Email" value={user.email} className="pad-left-15" />
                                    {submitted && !user.email && <div>Email is required</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pass"><Lock /></label>
                                    <input type="password" name="password" onChange={handleChange} placeholder="Password" value={user.password} className="pad-left-15" />
                                    {submitted && !user.password && <div>Password is required</div>}
                                </div>
                                {isSignUp &&
                                    <div className="form-group">
                                        <label htmlFor="re-pass"><Lock /></label>
                                        <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Repeat your password" value={user.confirmPassword} className="pad-left-15" />
                                        {submitted && !user.confirmPassword && <div>Confirm Password is required</div>}
                                    </div>
                                }
                                <div className="form-group form-button">
                                    <input type="submit" className="form-submit" value={isSignUp ? "Register" : "Login"} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src={SignUpImage} alt="sing up" /></figure>
                            <a href="" onClick={changeAuth} className="signup-image-link">{isSignUp ? "I am already member" : "Don't have an account?"} </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Login;
import { React, useState } from "react";
import "./Loginform.css";
import { FaUser, FaLock } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie"

const cookies = new Cookies();


const LoginForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const redirect = (response) => {
        cookies.set("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = "Token " + response.data.token;
        navigate("/");
    }

    const failedLogin = (error) => {
        setError(error.response.data.non_field_errors);
    }

    const login = (event) => {
        event.preventDefault()
        delete axios.defaults.headers.common["Authorization"]
        
        let data = {
            username: event.target.username.value,
            password: event.target.password.value,
        }

        axios.post(process.env.REACT_APP_API_URL + "login/", data).then(redirect).catch(failedLogin)
    }


    return (
        <div className='wrapper'>
            <form onSubmit={login}>
                <h1> Login </h1>
                <div className="message">
                    {error}
                </div>
                <div className="input-box">
                    <input name="username" type="text" placeholder="Username" required />
                    <FaUser className="icon" />
                </div>

                <div className="input-box">
                    <input name="password" type="password" placeholder="Password" required />
                    <FaLock className="icon" />
                </div>

                {/* Are we going to have password reset available?
                commented out as it causes compilation warnings. */}
                {/* <div className = "remember-forgot">
                    <label htmlFor=""> <input type="checkbox" /> Remember me</label>
                    <a href="#"> Forgot password </a>
                </div> */}

                <button type="submit"> Login </button>
                <div className="register-link">
                    <span>Don't have an account? </span> <Link to="/register">Register</Link>
                </div>

            </form>
        </div>
    )
}

export default LoginForm;
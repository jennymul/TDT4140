import "./Register.css"
import { useState } from "react";
import axios from 'axios';
import Cookies from "universal-cookie";
import  { useNavigate } from 'react-router-dom';

const cookies = new Cookies();

export default function RegisterForm() {
    // States for registration
    const [userName,setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lastName, setLastName] = useState("");

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleUserName = (e) => {
        setUserName(e.target.value);
        setSubmitted(false);
    };

    // Handling the name change
    const handleFirstName = (e) => {
        setFirstName(e.target.value);
        setSubmitted(false);
    };
    
    const handleLastName = (e) => {
        setLastName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {

        // If an invalid token is present, the request will fail.
        delete axios.defaults.headers.common["Authorization"];
        e.preventDefault();
        if(firstName === "" || email === "" || password === "" || lastName === ""){
            setError(true);
        }
        axios
            .post(process.env.REACT_APP_API_URL + "signup/", { 
                username: userName,
                first_name: firstName,
                last_name: lastName,
                password: password,
                email: email,
            })
            .then((response) => {
                if(response.status === 201){
                    setSubmitted(true);
                    handleLogin();
                }
            }
            ).catch(error => {
                setError(error.response.data.error);
                setSubmitted(false);
                console.log(error.response);
            })
    };

    const navigate = useNavigate();
    const handleLogin = () => {
        let data = {
            username: userName,
            password: password,
        }

        axios.post(process.env.REACT_APP_API_URL + "login/", data)
        .then(response => {
            if(response.status === 200) {
                axios.defaults.headers.common["Authorization"] = "Token " + response.data.token
                cookies.set("token", response.data.token);
                navigate("/");
            }
        })
    }

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1> {firstName  + " " + lastName} er registrert!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: submitted ? "" : "none",
                }}
            >
                <h1>{error}</h1>
            </div>
        );
    };

    return (
        <div className="registerform">
            <div>
                <h1>Registrer bruker</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>
            <form onSubmit={handleSubmit}>
                {/* Labels and inputs for form data */}
                <input
                    onChange={handleUserName}
                    className="input"
                    value={userName}
                    type="text"
                    placeholder="Brukernavn    "
                />
                <label className="label"></label>
                <input
                    onChange={handleFirstName}
                    className="input"
                    value={firstName}
                    type="text"
                    placeholder="Fornavn    "
                />

                <label className="label"></label>
                <input
                    onChange={handleLastName}
                    className="input"
                    value={lastName}
                    type="text"
                    placeholder="Etternavn"
                />

                <label className="label"></label>
                <input
                    onChange={handleEmail}
                    className="input"
                    value={email}
                    type="email"
                    placeholder="E-post"
                />

                <label className="label"></label>
                <input
                    onChange={handlePassword}
                    className="input"
                    value={password}
                    placeholder="Passord"
                    type="password"
                />

                <input type="submit" value="Submit" className="btn"></input>
            </form>
        </div>
    );
}
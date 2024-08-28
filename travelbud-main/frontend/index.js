import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Cookies from "universal-cookie"
import axios from "axios"

const cookies = new Cookies();

// Set default header on page reload
let token = cookies.get("token")
axios.defaults.headers.common["Authorization"] = "Token " + token


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

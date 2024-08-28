import axios from "axios"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const cookies = new Cookies();

export default function Logout() {
    delete axios.defaults.headers.common["Authorization"]
    cookies.remove("token");
    let navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    })
}
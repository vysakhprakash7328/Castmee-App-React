import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Logout = () => {
    const history = useHistory();
    localStorage.removeItem('user_details');
    history.push('home')

}; export default Logout;
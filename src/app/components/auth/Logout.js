import React from "react";
import { signOut } from "../../api/Auth"

const Logout = () => {
    return(
    <button 
    onClick={() => {
        signOut()
        window.location.reload()
    }} 
    className="btn btn-danger btn-lg btn-block logout bg-violet">
    Logout
  </button>)
}
export default Logout;

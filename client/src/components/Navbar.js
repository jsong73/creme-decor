import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    return(
        
        <div id="nav" className="text-right p-3  ">
            {Auth.loggedIn() ? (
                <>
                <ul>
                    <li>
                        <button> <Link to="/orderhistory"> Order History </Link>
                        </button>
                    </li>
                    <li>
                        <button onClick={logout}>  Logout
                        </button>
                    </li>
                </ul>
                </>
            ):(
                <>
                <ul>
                    <li>
                        <button> <Link to="/login"> Login </Link>
                        </button>
                    </li>
                    <li>
                        <button> <Link to="/signup"> Sign up </Link>
                        </button>
                    </li>
                </ul>
                
                
                </>
            )}
        </div>
    )
}

export default Navbar;


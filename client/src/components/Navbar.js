import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Navbar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }
    return(
        <div>
            {Auth.loggedIn() ? (
                <>
                <ul className="flex flex-col mt-4">
                    <li>
                        <button className="block"> <Link to="/orderhistory"> Order History </Link>
                        </button>
                    </li>
                    <li>
                        <button className="block" onClick={logout}>  Logout
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


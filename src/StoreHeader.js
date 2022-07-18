import { Link } from "react-router-dom";
import { useState } from "react";
import Login from "./Login";

const storeLogo = require("./StoreHeader.js");

const StoreHeader = ({ cart, user, setUser }) => {
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart
    const [loginDisplay, setLoginDisplay] = useState("none");
    const printCartQuantity = () => {
        if (cart.length < 1) {
            return null
        } else {
            return (<span> ({cart.length}) </span>)
        }
    }
    const onClickLogin = (e) => {
        e.preventDefault();
        setLoginDisplay("block");
    }
    const displayLoginButton = () => {
        if (loginDisplay === "none") {
            return <div>
                <Login displayLogin={loginDisplay} user={user} setUser={setUser} />
                <button onClick={onClickLogin}>Login</button>
                <button>Register</button>
            </div>
        } else {
            return <Login displayLogin={loginDisplay} user={user} setUser={setUser} />
        }
    }



    return (<div className="store-header">
        <img src={storeLogo} alt="Logo" />
        <div>
            <input type="text" />
            <button>Search</button>
        </div>
        {displayLoginButton()}
        <div>
            Order History
        </div>
        <Link to="./cart">
            Cart {printCartQuantity()}
        </Link>
    </div>)
};

export default StoreHeader;
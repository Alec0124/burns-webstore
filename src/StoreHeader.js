const storeLogo = require("./StoreHeader.js");

const StoreHeader = () => {
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart



    return ( <div className="store-header">
        <img src={storeLogo} alt="Logo" />
        <div>
            <input type="text" />
            <button>Search</button>
        </div>
        <div>
            <button>Login</button>
            <button>Register</button>
        </div>
        <div>
            Order History
        </div>
        <div>
            Cart
        </div>
    </div>)
};

export default StoreHeader;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

const Cart = ({ cart, setCart, user, setUser }) => {

    const navigate = useNavigate();

    //states
    const [displayLocalLogin, setDisplayLocalLogin] = useState("none");

    const loginButtonDisplay = () => {
        if(displayLocalLogin === "none") {
            return "inline-block";
        } else {
            return "none";
        }
    }
    const mapCart = (item) => {
        return <tr key={item.id}>
            <td>{item.ln}</td>
            <td><img alt={item.itemNumber} /></td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity}</td>
        </tr>
    };
    const printTotal = () => {
        let total = 0;
        cart.forEach(item => {
            const lnPrice = item.price * item.quantity;
            console.log(lnPrice);
            total = total + lnPrice;
        });

        return <td>
            ${total.toFixed(2)}
        </td>
    }


    useEffect(() => {

    })


    const displayCart = () => {
        if (cart.length < 1) {
            return <div> No items are in your cart.</div>
        } else {
            return <table className="cart-table">
                <tbody>
                    <tr>
                        <td>Ln#</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Quantity</td>
                        <td>Line Price</td>
                    </tr>
                    {cart.map(mapCart)}
                    <tr>
                        <td colSpan="5"></td>
                        <td>Total:</td>
                    </tr>
                    <tr>
                        <td colSpan="5"></td>
                        {printTotal()}
                    </tr>
                </tbody>
            </table>
        }
    };
    const printButtons = () => {
        if (cart.length < 1) {
            return null
        } else {
            return <div className="cart-buttons">
                <button onClick={onClickClearCart}>Clear Cart</button>
                <button onClick={onClickCheckout}>Proceed to Checkout</button>
            </div>
        }
    };
    const printAddress = () => {
        if (!!user) {
            <div className="cart-address">
                <div className="cart-ship">Ship to info:
                    <div>Attn: </div>
                    <div>Address 1: </div>
                    <div>Address 2: </div>
                    <div>City: </div>
                    <div>FL: </div>
                    <div>Zip: </div>
                    <div>phone: </div>
                    <div>email: </div>
                </div>
                <div className="cart-bill">Bill to info:
                    <div>Attn: </div>
                    <div>Address 1: </div>
                    <div>Address 2: </div>
                    <div>City: </div>
                    <div>FL: </div>
                    <div>Zip: </div>
                    <div>phone: </div>
                    <div>email: </div>
                </div>
            </div>
        } else {
            return <div className="cart-address">
                Please register or login before checking out. 
                <button onClick={(e)=>{
                    navigate("/register");
                }}>Register</button>
                <button style={{display: loginButtonDisplay()}} onClick={(e)=>{
                    setDisplayLocalLogin("inline-block");
                }} >Login</button>
                <Login user={user} setUser={setUser} displayLogin={displayLocalLogin} setDisplayLogin={setDisplayLocalLogin} />
            </div>
        }
    }
    const onClickClearCart = (e) => {
        setCart([]);
        localStorage.removeItem("cart");

    }
    const onClickCheckout = (e) => {
        navigate("/checkout");

    }
    //Actions

    return (<div className="cart">
        {printAddress()}
        {/* .cart-tabe */}
        {displayCart()}
        {/* .cart-buttons */}
        {printButtons()}
    </div>)
}

export default Cart;
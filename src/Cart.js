import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {

    const navigate = useNavigate();

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
        cart.forEach(item=>{
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
        if(cart.length < 1) {
            return null
        } else {
            return <div>
                <button onClick={onClickClearCart}>Clear Cart</button>
                <button onClick={onClickCheckout}>Proceed to Checkout</button>
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

    return ( <div className="cart">
        {displayCart()}
        {printButtons()}
        </div> )
}

export default Cart;
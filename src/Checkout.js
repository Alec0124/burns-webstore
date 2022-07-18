import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, user, setCart }) => {
    const navigate = useNavigate();
    if (!user) { navigate("/register"); }

    const printTotal = () => {
        let total = 0;
        cart.forEach(item=>{
            const lnPrice = item.price * item.quantity;
            total = total + lnPrice;
        });

        return `$${total.toFixed(2)}.`
    }
    const onClickViewCart = (e) => {
        e.preventDefault();
        navigate("/cart");
    }
    const onClickCheckout = (e) => {
        e.preventDefault();
        const isTransactionSuccess = true;
        if(!!isTransactionSuccess) {
            setCart([]);
            localStorage.removeItem("cart");
            navigate('/home');
        }

    }

    return (
        <div className="checkout">
            <form>
                <div>Creditcard Number: <input type="text" /></div>
                <div>Exp: <input type="month" /></div>
                <div>CVV: <input type="text" /></div>
                <div>Your final total comes out to {printTotal()}</div>
                <div>
                    <button onClick={onClickViewCart}>View Cart</button>
                    <button onClick={onClickCheckout}>Checkout</button>
                </div>
                
            </form>
        </div>
    )

}

export default Checkout;
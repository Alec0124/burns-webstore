import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {createOrder} from "./api"


const Checkout = ({ cart, user, setCart }) => {
    const navigate = useNavigate();
    if (!user) { navigate("/register"); }

    const printTotal = () => {
        let total = 0;
        cart.forEach(item => {
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
        try {
        e.preventDefault();
        console.log("user: ", user)
        const isTransactionSuccess = true;
        if (!!isTransactionSuccess) {
            console.log('cart: ', cart);
            const orderDetails = {
                userId:user.id,
                attnShipping:user.firstName + " " + user.lastname,
                emailShipping:user.emailShipping,
                phoneShipping:user.phoneShipping,
                address1Shipping:user.address1Shipping,
                address2Shipping:user.address2Shipping,
                zipShipping:user.zipShipping,
                stateShipping:user.stateShipping,
                attnBilling:user.firstName + " " + user.lastname,
                emailBilling:user.emailBilling,
                phoneBilling:user.phoneBilling,
                address1Billing:user.adddress1Billing,
                address2Billing:user.address2Billing,
                zipBilling:user.zipBilling,
                stateBilling:user.stateBilling
            }
            createOrder(user.token, orderDetails, cart);
            setCart([]);
            localStorage.removeItem("cart");
            navigate('/home');
        }
    } catch (error) {
        console.error(error);
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
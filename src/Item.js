import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Item = ({ cart, setCart, contentItems }) => {

    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart

    const [quantity, setQuantity] = useState(1)

    const { itemNumber } = useParams();
    console.log('Item component', itemNumber);
    const activeItem = contentItems.find((item) => itemNumber === item.itemNumber);

    //functions
    const onChangeQuantity =  (e) => {
        setQuantity(parseInt(e.target.value));
    }

    const onClickAddToCart = (e) => {

        if (cart.length < 1) {
            console.log('cart: ', cart);
            const cartItem = activeItem;
            cartItem.ln = 1;
            cartItem.quantity = quantity;
            setCart([cartItem]);
        } else {
            console.log('cart: ', cart);
            const newCart = [...cart];
            const indexInCart = newCart.findIndex(item => item.itemNumber === activeItem.itemNumber);
            console.log("indexInCart", indexInCart);
            if (indexInCart !== -1) {
                newCart[indexInCart].quantity = newCart[indexInCart].quantity + quantity;
            } else {
                const ln = cart[cart.length - 1].ln + 1;
                const cartItem = activeItem;
                cartItem.ln = ln;
                cartItem.quantity = quantity;
                newCart.push(cartItem);
            };
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));


        }

    };
    

    useEffect(() => {

    })


    if (!!activeItem) {
        return (<div className="store-item">
            <h1>{activeItem.name}</h1>
            <img alt="item" style={
                {
                    width: "700px",
                    height: "400px",
                    backgroundColor: "red"
                }
            } />
            <h3>${activeItem.price.toFixed(2)}</h3>
            <p>{activeItem.description}</p>
            <div>Quantity: <input type="number" value={quantity} onChange={onChangeQuantity} /></div>
            <button onClick={onClickAddToCart}>Add to Cart</button>


        </div>)
    } else return null
}

export default Item;
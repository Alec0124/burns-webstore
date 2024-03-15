import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import checkmark from "./images/checkmark.webp";

const Item = ({ cart, setCart, contentItems }) => {

    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart

    const [quantity, setQuantity] = useState(1);
    const [hasAddedToCart, setHasAddedToCart] = useState(false);

    const { itemNumber } = useParams();
    console.log('Item component', itemNumber);
    const activeItem = contentItems.find((item) => itemNumber === item.itemNumber);

    //functions
    const onChangeQuantity = (e) => {
        setQuantity(parseInt(e.target.value));
    }
    const returnImageSrc = (item) => {
        if (!!item.images && !!item.images.small) {
            return require(`./images/items/${item.images.small.name}`)
        } else {
            return ""
        }
    }
    const onClickAddToCart = (e) => {

        if (cart.length < 1) {
            console.log('cart: ', cart);
            const cartItem = { ...activeItem };
            cartItem.ln = 1;
            cartItem.quantity = quantity;
            !!cartItem.images && !!cartItem.images.thumbnail ? cartItem.imageName = cartItem.images.thumbnail.name : //
                delete cartItem.categories;
            delete cartItem.images;
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
                const cartItem = { ...activeItem };
                cartItem.ln = ln;
                cartItem.quantity = quantity;
                !!cartItem.images && !!cartItem.images.thumbnail ? cartItem.imageName = cartItem.images.thumbnail.name :
                    delete cartItem.categories;
                delete cartItem.images;
                newCart.push(cartItem);
            };
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            setHasAddedToCart(true);



        }

    };


    useEffect(() => {

    })


    if (!!activeItem) {
        // console.log("active large image: ", activeItem.images.large.name)

        if (!!hasAddedToCart) {
            return (<div className="addedToCart">
                <div className="top-row">
                    <div className="item-window">
                        <img alt="item" src={returnImageSrc(activeItem)} />
                        <div>
                            <img className="checkmark" src={checkmark} alt="checkmark" />
                            <span>
                                Added to Cart
                            </span>
                        </div>
                    </div>
                    <div className="cart-window">
                        <div>
                            <span>
                                Cart Subtotal: 
                            </span>
                            <span className="cart-value">
                                $55
                            </span>
                        </div>
                        <button className="checkout">
                            Proceed to checkout 1 item
                        </button>
                        <button>
                            Go to Cart
                        </button>
                    </div>
                </div>
                <div className="shop-window">
                    <div className="description">
                        <div>
                            Here are some other items that may interest you!
                        </div>
                        <div>
                            Page 1 0f 4
                        </div>
                    </div>
                    <div>
                        showcase items here
                    </div>
                </div>
            </div>

            )
        } else {
            return (<div className="store-item">
                <h1>{activeItem.name}</h1>
                <img alt="item" src={returnImageSrc(activeItem)} style={
                    {
                        // width: "700px",
                        height: "400px"
                    }
                } />
                <h3>${activeItem.price.toFixed(2)}</h3>
                <p>{activeItem.description}</p>
                <div>Quantity: <input type="number" value={quantity} onChange={onChangeQuantity} /></div>
                <button onClick={onClickAddToCart}>Add to Cart</button>


            </div>)
        }
    } else return null
}

export default Item;
import { useEffect, useState } from "react";
import { getOrdersByUser } from './api';
import ItemImage from './ItemImage.js';

const OrderHistory = ({ user }) => {
    //create a list of orders by getAllOrdersForUser
    //display the Order List
    //when order is clicked, show Order detail info (change address bar and create new coponent)

    //states
    const [orders, setOrders] = useState([]);

    //
    // const imageSource = (lineItem) => {
    //     if (false) {
    //         return ""
    //     } else {
    //         console.log("lineItem.imageName")
    //         if (lineItem.imageName.length > 0) {
    //             return require(`/images/items/${lineItem.imageName}`);
    //         } else
    //             return "";
    //     }
    // };
    const displayLineItems = (order) => {
        if (!!order.lineItems) {
            return <div className="line-items" >
                <div className="order-status"> Order Delivered April 1st</div>
                {order.lineItems.map(mapLineItems)}
            </div>
        } else {
            return null
        }

    };
    const displayOrders = () => {
        if (orders.length > 0) {
            return orders.map(mapOrders)

        } else {
            return null
        }

    };
    const mapLineItems = (lineItem) => {
        console.log("lineItem.imageNAme: ", lineItem.imageName);
        return <div className="line-item" key={lineItem.id}>
            <ItemImage alt={lineItem.itemNumber} imageName={lineItem.imageName} />
            {/* <img alt={lineItem.name} src={imageSource(lineItem)} /> */}
            <div>
                <div>
                    {lineItem.name} <br />
                    {lineItem.description}
                </div>
                <div style={{ textAlign: "left", margin: "5px 0px" }}>
                    <button className="line-item-button">Buy it Again</button>
                    <button className="line-item-button">View Item</button>
                </div>
            </div>
        </div>
    };
    const mapOrders = (order) => {
        return <div className="order" key={order.id}>
            <div className="order-details">
                <div className="order-details-left">
                    <div>
                        <div>Order Placed</div>
                        <div>March 23rd</div>
                    </div>
                    <div>
                        <div>Total</div>
                        <div>$100</div>
                    </div>
                    <div>
                        <div>Ship to</div>
                        <div>{order.attnShipping}</div>
                    </div>
                </div>
                <div className="order-details-right">
                    <div>
                        <span>Order Id: </span>
                        <span>{order.id}</span>
                    </div>
                    <div>
                        View Order Details | View Invoice
                    </div>
                </div>
            </div>
            {displayLineItems(order)}
        </div>
    }

    //
    useEffect(() => {

        const checkForOrders = async () => {
            if (orders.length === 0) {
                //get orders for user
                const token = localStorage.getItem('token');
                console.log('getting order by user token: ', token)
                const newOrders = await getOrdersByUser(token);
                if (newOrders.length > 0) {
                    setOrders(newOrders);
                }
            }
        }
        checkForOrders();

    }, [orders])

    //
    return <div id="order-history">
        <div className="order-history-title">
            Your Orders
        </div>
        {displayOrders()}
    </div>
};

export default OrderHistory;
import { useEffect, useState } from "react";
import { getAllItems } from "./api/index.js";
import { useParams, Link } from "react-router-dom";

const Category = ({ contentItems }) => {

    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart

    const { id } = useParams();
    console.log('Category component', id);

    useEffect(() => {

    })
    const imgSrc = (item) => {
        try {
            if (!!item.images.thumbnail) {
                console.log("item.images.thumbnail exists")
                return require(`./images/items/${item.images.thumbnail.name}`);
            } else {
                return "";
            }
        }
        catch (err) {
            console.error(err);
            return ""
        }
    }
    const displayStoreContent = (id) => {


        if (!!contentItems && contentItems.length > 0) {
            return (<div className="store-content">
                {contentItems.map((item) => {

                    if (item.categories.some((category) => category.id === Number(id))) {

                        return (<Link to={`/item/${item.itemNumber}`} className="thumbnail" key={item.id} >
                            <div><b>{item.name}</b></div>
                            {/* image */}
                            <img className="thumbnail-image" alt="thumb_image" src={imgSrc(item)} />
                            <div><small># {item.itemNumber}</small></div>
                            <div>${Number.parseFloat(item.price).toFixed(2)}</div>
                        </Link>)
                    }
                    else {
                        return null;
                    }
                })
                }
            </div>)
        } else {
            // console.log("store-message")
            return null
        };

        // useEffect(() => {

        // });



    };

    return displayStoreContent(id);
}

export default Category;
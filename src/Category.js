import { useEffect, useState } from "react";
import {getAllItems} from "./api/index.js";
import {useParams, Link} from "react-router-dom";

const Category = ({ contentItems }) => {
    
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart

    const {id} = useParams();
    console.log('Category component', id);

    useEffect(() => {
        
    })

    const mapContentItems = (id) => {

        if (!!contentItems) {
            console.log('inside contentItems', contentItems)

            return (<div className="store-content">
                {contentItems.map((item) => {

                    if(item.categories.some((category)=> category.id === Number(id))) {

                    return (<Link to={`/item/${item.itemNumber}`} className="thumbnail" key={item.id} >
                        <div><b>{item.name}</b></div>
                        {/* image */}
                        <img alt="thumb_image" />
                        <div><small># {item.itemNumber}</small></div>
                        <div>${Number.parseFloat(item.price).toFixed(2)}</div>
                    </Link>)
        }
    else {
        return null;
    }})
                }
            </div>)
        } else {
            return null;
        };

        // useEffect(() => {

        // });



    };

    return mapContentItems(id);
}

export default Category;
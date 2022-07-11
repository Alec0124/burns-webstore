import { useEffect, useState } from "react";
import {getAllItems} from "./api/index.js"

const StoreContent = ({ selectedCategoryId, contentItems }) => {
    
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart


    // useEffect(() => {
        
    // })

    const mapContentItems = () => {

        if (!!contentItems) {
            console.log("contentItems is true", contentItems)
            return (<div className="store-content">
                {contentItems.map((item) => {
                    return (<div className="thumbnail" key={item.id} >
                        <div>{item.name}</div>
                        {/* image */}
                        <div>{item.itemNumber}</div>
                        <div>{item.price}</div>
                    </div>)
                })
                }
            </div>)
        } else {
            return null;
        };

        // useEffect(() => {

        // });



    };

    return mapContentItems();
}

export default StoreContent;
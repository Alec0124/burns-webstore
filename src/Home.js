import { useEffect, useState } from "react";
import {getAllItems} from "./api/index.js"

const StoreContent = ({ contentItems }) => {
    
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart

    

    // useEffect(() => {
        
    // })

    const mapContentItems = () => {

        if (!!contentItems) {

            return (<div className="store-content">
                HOME
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
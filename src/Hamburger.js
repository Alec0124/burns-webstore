import { useState } from "react";
import { Link } from "react-router-dom";

const Hamburger = ({categoryList}) => {
    //
    const hamburgerIcon = require("./images/Hamburger_icon.png");
    const backIcon = require("./images/back_icon.png");
    const storeLogo = require("./images/storeLogo.png");
    const hamburgerIconWhite = require("./images/Hamburger_icon_white.png");

    //
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

    //

    const onClickCategories = () => {
        if (!!isCategoriesVisible) {
            setIsCategoriesVisible(false);
        } else {
            setIsCategoriesVisible(true);
        }
    };
    const onClickHamburger = () => {
        if (!!isDropdownVisible) {
            setIsDropdownVisible(false);
        } else {
            setIsDropdownVisible(true);
        }
    };
    const closeHamburgerMenu = () => {
        setIsCategoriesVisible(false);
        setIsDropdownVisible(false);
    }
    const mapCategoryList = (category) => {
        return <Link onClick={closeHamburgerMenu} className="hamburger-item" to={`/category/${category.id}`}>
            {category.name}
        </Link>
    };
    const printHamburgerDropdown = () => {
        if (!!isDropdownVisible) {
            if (!isCategoriesVisible) {
                //default display
                return <div className="hamburger-dropdown not-desktop" >
                    <img className="hamburger-image" onClick={onClickHamburger} alt="hamburger" src={hamburgerIconWhite} />
                    <div className="hamburger-store-logo">
                    <img alt="store logo" className="store-logo" src={storeLogo} />
                    </div>
                    <div className="hamburger-dropdown-list">
                    <Link onClick={closeHamburgerMenu} className="hamburger-item" to="/home">
                        Home
                    </Link>
                        <div className="hamburger-item" onClick={onClickCategories} >
                            Categories
                        </div>
                        <Link onClick={closeHamburgerMenu} className="hamburger-item" to="/orderHistory">
                            Order History
                        </Link>
                        <Link onClick={closeHamburgerMenu} className="hamburger-item" to="/cart">
                            Cart
                        </Link>
                    </div>
                </div>
            } else {
                //categories display
                return <div className="hamburger-dropdown not-desktop" >
                    <img className="hamburger-image" onClick={onClickCategories} alt="back" src={backIcon} />
                    <div className="hamburger-label" >
                        Categories
                    </div>
                    <div className="hamburger-dropdown-list">
                        {categoryList.length > 0 ? categoryList.map(mapCategoryList) : null}
                    </div>
                </div>
            }
        } else {
            return null
        }
    }

    //

    return <div id="hamburger" >
        <img className="hamburger-image not-desktop" alt="hamburger" src={hamburgerIcon} onClick={onClickHamburger} />
        {printHamburgerDropdown()}
    </div>

};

export default Hamburger;
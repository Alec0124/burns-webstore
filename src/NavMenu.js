import { NavLink } from "react-router-dom";

const NavMenu = ({ setSelectedCategory, selectedCategory, categoryList }) => {
    //Store Logo (also home button) // Search Bar // My Account // My Orders // Cart


    const mapCategories = (category) => {
        return <NavLink to={`/category/${category.id}`} key={category.id}> {category.name}</NavLink>
        
}
    console.log('category List: ',categoryList)
    console.log('Boolean: ', Array.isArray(categoryList));
    if(Array.isArray(categoryList)) {
    return ( <div className="nav-menu">
        <NavLink to="/home" >Home</NavLink>
        {categoryList.map(mapCategories)}
    </div>)
    }
};

export default NavMenu;
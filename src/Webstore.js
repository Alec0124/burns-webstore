import React from "react";
import NavMenu from "./NavMenu.js";
import Category from "./Category.js";
import Cart from "./Cart.js";
import Login from "./Login.js";
import Checkout from "./Checkout.js";
import Register from "./Register.js";
import Item from "./Item.js";
import Home from "./Home.js";
import Logout from "./Logout.js";
import StoreFooter from "./StoreFooter.js";
import StoreHeader from "./StoreHeader.js";
import { useState, useEffect } from "react";
import { BASE_URL, getAllCategories, getAllItems } from "./api/index.js";
import { Route, Routes } from "react-router-dom";

//toDoList
//Touch up Login component, useful error messaging
//create register page and functionality
//Successful Chekout should create a new order for that user
//Need to create OrderHistory Component
//Need Search Bar Functionality for Webstore
//Have a place in admin to upload store logo, make funcitonal
//modify database to accept images for items. They should have a thumbnail, small, reg.

//will need to review the admin security



function Webstore() {


  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [contentItems, setContentItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(false);

  const setCategoryListWrapper = async (value) => {
    setCategoryList(value)
  }

  useEffect(() => {
    //check local storge for categories
    const verifyItems = async () => {
      try {
        if (contentItems.length < 1) {
          const itemsResp = localStorage.getItem('items');
          if (!!itemsResp) {
            const localItems = await JSON.parse(itemsResp);


            setContentItems(localItems);
          } else {
            const tempItems = await getAllItems();
            tempItems.forEach((item) => {
              delete item.cost;
            })
            localStorage.setItem("items", JSON.stringify(tempItems));
            setContentItems(tempItems);
          }
        }
      } catch (error) { throw error }
    };

    const verifyCategories = async () => {
      try {
        if (categoryList === null) {
          const categoriesResp = localStorage.getItem('categories');
          if (!!categoriesResp && categoryList === []) {
            const localCategories = await JSON.parse(categoriesResp);
            await setCategoryListWrapper(localCategories);
          } else {
            const tempCategories = await getAllCategories();
            localStorage.setItem("categories", JSON.stringify(tempCategories));
            await setCategoryListWrapper(tempCategories);
          }
        }
      } catch (error) { throw error }
    };
    const verifyCart = async () => {
      try {
        if (cart.length < 1) {
          const cartResp = localStorage.getItem('cart');
          if (!!cartResp) {
            const localCart = await JSON.parse(cartResp);


            setCart(localCart);
            localStorage.setItem("cart", JSON.stringify(localCart))
          }
        }
      } catch (error) { throw error }
    };
    const verifyUser = async () => {
      try {
        if (user === false) {
          const tokenResp = localStorage.getItem('token');
          if (!!tokenResp) {

            const userResp = await fetch(`${BASE_URL}/verify`, {
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${tokenResp}`
              }
            });
            const verifiedUser = await userResp.json();
            if (verifiedUser.name === "JsonWebTokenError") {
              throw new Error(verifiedUser.message);
            }


            setUser(verifiedUser.user);

          }
        }
      } catch (error) { throw error }
    };

    verifyCategories();
    verifyItems();
    verifyCart();
    verifyUser();

    //if exists store into state
    //if not, fetch categories and store them in state and localStorage.
  })

  return (
    <div className="App">
      <StoreHeader cart={cart} user={user} setUser={setUser} />
      <NavMenu setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} categoryList={categoryList} />
      <Routes>
      <Route path="/logout" element={<Logout setUser={setUser} />} />
        <Route path="/register" element={<Register user={user} setUser={setUser}/>} />
        <Route path="/login" element={<Login displayLogin="block" user={user} setUser={setUser} />} />
        <Route path="/home" element={<Home contentItems={contentItems} />} />
        <Route path="/cart" element={<Cart setUser={setUser} user={user} cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout setCart={setCart} cart={cart} user={user} />} />
        <Route path="/item/:itemNumber" element={<Item contentItems={contentItems} cart={cart} setCart={setCart} />} />
        <Route path="/category/:id" element={<Category contentItems={contentItems} />} />
      </Routes>
      <StoreFooter />
    </div>
  );
}

export default Webstore;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
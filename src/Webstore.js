import React from "react";
import NavMenu from "./NavMenu.js";
import StoreContent from "./StoreContent.js";
import StoreFooter from "./StoreFooter.js";
import StoreHeader from "./StoreHeader.js"
import { useState, useEffect } from "react";
import { getAllCategories, getAllItems } from "./api/index.js"

function Webstore() {


  const [categoryList, setCategoryList] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [contentItems, setContentItems] = useState(null);

  const setCategoryListWrapper = async (value) => {
    setCategoryList(value)
  }

  useEffect(() => {
    //check local storge for categories
    const verifyItems = async () => {
      try {
          if (contentItems === null) {
              const itemsResp = localStorage.getItem('items');
              if (!!itemsResp) {
                  const localItems = await JSON.parse(itemsResp);


                  setContentItems(localItems);
              } else {
                  const tempItems = await getAllItems();
                  console.log("tempItems: ", tempItems);
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
            console.log("localCategories: ", localCategories)
            console.log("localCategories type: ", typeof (localCategories))
            await setCategoryListWrapper(localCategories);
          } else {
            const tempCategories = await getAllCategories();
            console.log("tempCategory: ", tempCategories);
            localStorage.setItem("categories", JSON.stringify(tempCategories));
            await setCategoryListWrapper(tempCategories);
          }
        }
      } catch (error) { throw error }
    };

    verifyCategories();
    verifyItems();

    //if exists store into state
    //if not, fetch categories and store them in state and localStorage.
  })

  return (
    <div className="App">
      <StoreHeader categoryList={categoryList} />
      <NavMenu setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} categoryList={categoryList} />
      <StoreContent contentItems={contentItems} selectedCategory={selectedCategory} />
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
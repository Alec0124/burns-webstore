import search from '../images/search.png'
import { useState } from 'react';
import Loading from './Loading'
import { useEffect } from 'react';
import { updateCategory, getAllCategories, createCategory, removeCategory, removeItem } from '../api/index.js';
import ListExchange from './ListExchange';
import ListView from './ListView';

function Categories({ user, setSelectedCat, verifyToken }) {

  //component states

  const [searchDropdownItems, setSearchDropdownItems] = useState(null);
  const [mode, setMode] = useState('view');
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [categorySearchDisplay, setCategorySearchDisplay] = useState("none");
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [deleteDisplay, setDeleteDisplay] = useState('none');

  //wrapper set state functions


  const setModeCreate = () => {
    setMode("create");
  }

  const resetFieldStates = () => {
    setName("");
  };
  const setModeEdit = () => {
    setMode("edit");
  }
  const setModeView = () => {
    setMode("view");
  }

  //On Key Click
  const onClickEsc = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setSearchDropdownItems(null);
      //need to add more code to make list stay gone until you leave and re-enter the element
    }
  };
  //On Click Functions

  const onClickCreate = () => {
    //reset all states to default
    resetFieldStates();
    setModeCreate();
  }

  const onClickEdit = () => {
    const selectedCategory = categoryList.find((category) => category.name === name)
    if (selectedCategory) {
      setCategoryId(selectedCategory.id);
      setModeEdit();
    }
  }

  const onClickCreateSave = async () => {
    try {
      //requirements
      const newCategory = await createCategory(user.token, name);
      setCategoryId(newCategory.id);
      const newList = [...categoryList].push(newCategory);
      setCategoryList(newList)

    }
    catch (error) { throw error }
    // fetch()
    //add new item to db
    //return to view item
    setModeView();
  };
  const onClickEditSave = async () => {
    try {
      //requirements
      const updatedCategory = await updateCategory(user.token, categoryId, name);
      //need to refresh category list
    }
    catch (error) { throw error }
    // fetch()
    //add new item to db
    //return to view item
    setModeView();
  };
  const onClickView = () => {
    //

  };
  const onClickItemNumberDropdown = (e) => {
    // const clickedCategoryName = e.target.textContent;
    setSearchDropdownItems(null);

    const targetItem = categoryList.find(item => item.name === e.target.textContent);
    if (typeof (targetItem) === "object") {
      setName(targetItem.name);
      setCategoryId(targetItem.id);
    };
    //repeat view item action for clicked item


  };
  const onClickSearchCategory = async () => {
    setCategorySearchDisplay("block");
  };

  const onClickEditCancel = () => {

    setModeView();

  };
  const onClickCreateCancel = () => {
    resetFieldStates();
    setModeView();
  };

  const onClickDelete = () => {
    //show dialog asking for delete confirmation
    setDeleteDisplay("block");

  };
  const onClickConfirmDelete = async () => {
    try {

      await removeCategory(user.token, categoryId);
      setDeleteDisplay('none');
      resetFieldStates();
      setModeView();
    } catch (error) {
      throw error
    }
  };
  const onClickCancelDelete = () => {
    setDeleteDisplay("none");
  }

  //onChange functions

  // const itemNumberOnChange = (e) => {
  //   setItemNumber(e.target.value.trim().toUpperCase());

  //   try {
  //     const itemNumberQuery = e.target.value.trim().toUpperCase();
  //     if (itemNumberQuery.length >= 3 && Array.isArray(allItems)) {
  //       //search db for item numbers
  //       //likely using poor async form here
  //       const previewList = allItems.filter(item =>
  //         item.itemNumber.substring(0, itemNumberQuery.length) === itemNumberQuery
  //       );

  //       setSearchDropdownItems(previewList);
  //     };
  //     if (itemNumberQuery.length < 3) {
  //       setSearchDropdownItems(null);
  //     };
  //   }
  //   catch (error) {
  //     console.error(error);
  //   }
  // };
  const searchDropDownOnMouseEnter = () => {

    setIsDropdownHover(true);
  };
  const searchDropDownOnMouseLeave = () => {

    setIsDropdownHover(false);
  };
  const itemNumberOnBlur = (e) => {
    //only if cursor not in dropdown

    if (!isDropdownHover) {
      setSearchDropdownItems(null);
    };
  };
  const nameOnChange = (e) => {
    setName(e.target.value);
    try {
      const categoryQuery = e.target.value.trim().toLowerCase();
      if (categoryQuery.length >= 3 && Array.isArray(categoryList)) {
        //search db for item numbers
        //likely using poor async form here
        const previewList = categoryList.filter(category => {

          if (!category.name) {
            throw new Error('could not red category.name in nameOnChange()')
          }
          const categoryName = category.name.toLowerCase();
          const searchQuery = e.target.value.toLowerCase();
          return (categoryName.includes(searchQuery))
        });


        setSearchDropdownItems(previewList);
      };
      if (categoryQuery.length < 3) {
        setSearchDropdownItems(null);
      };
    }
    catch (error) {
      console.error(error);
    }
  };
  // end of onChange functions

  // helper functions


  // const modifyCategories = () => {
  //   return <div className="modify-categories" style={{"display":modifyCategoriesDisplay}}>
  //     <button onClick={onClickCloseModifyCategories}>Close Window</button>
  //     <div className="category-list">
  //     {categoryList.map((category => {
  //         return <div className="row" key={category.id}>
  //           {category.name}
  //         </div>
  //       }))}
  //     </div>
  //     <div className="category-selected">
  //       <div className="row">
  //         test
  //       </div>
  //       {categories.map((category => {
  //         return <div className="row" key={category.id}>
  //           {category.name}
  //         </div>
  //       }))}
  //     </div>

  //   </div>
  // }
  const displaySearchDropdown = (itemList) => {
    try {
      if (!Array.isArray(itemList)) {
        return;
      };
      return (
        <div className='search-dropdown' onMouseEnter={searchDropDownOnMouseEnter} onMouseLeave={searchDropDownOnMouseLeave}>
          {itemList.map(item => {
            return (
              <div className="search-dropdown-row" onClick={onClickItemNumberDropdown} key={item.id}>
                {item.name}
              </div>
            )
          })}
        </div>
      )

    }
    catch (error) {
      throw error;
    }
  };


  // displays

  const chooseDisplayMode = () => {
    if (mode === 'view') {
      return displayViewMode();
    } else if (mode === 'create') {
      return displayCreateMode();
    } else if (mode === 'edit') {
      return displayEditMode();
    }
  }
  //      VIEW MODE   //
  const displayViewMode = () => {
    return (
      <div className="item-master">
        <div className="row">
          <span>Category Name:</span>
          <input type="text" value={name} onChange={nameOnChange} onKeyDown={onClickEsc} />
          <img className='search-icon' src={search} alt="Search Button" onClick={onClickSearchCategory} />
          {displaySearchDropdown(searchDropdownItems)}
          <ListView
            columnKeys={["id", "name"]}
            columnNames={["Id #", "Name"]}
            componentDisplay={categorySearchDisplay}
            setComponentDisplay={setCategorySearchDisplay}
          // rowEnterFunction={ }
          />
        </div>
        <div className="row">
          Category Id: {categoryId}
        </div>

        <div className="row">
          <button onClick={onClickView}>View</button>
          <button onClick={onClickEdit}>Edit</button>
          <button onClick={onClickCreate}>Create</button>
          <button disabled className='inactive'>Save</button>
          <button disabled className='inactive'>Cancel</button>
          <button disabled className='inactive'>Delete</button>
        </div>

      </div>
    )
  }
  //    CREATE MODE     //
  const displayCreateMode = () => {
    return (
      <div className="item-master">
        <div className="row">
          <span>Category Name:</span>
          <input type="text" value={name} onChange={nameOnChange} />
          {/* <ListView
          columnKeys={["itemNumber", "name", "description"]}
          columnNames={["Item #", "Name", "Description"]}
          componentDisplay={categorySearchDisplay}
          setComponentDisplay={setCategorySearchDisplay}
        // rowEnterFunction={ }
        /> */}
        </div>
        <div className="row">
          Category Id:
        </div>

        <div className="row">
          <button disabled onClick={onClickView}>View</button>
          <button disabled onClick={onClickEdit}>Edit</button>
          <button disabled onClick={onClickCreate}>Create</button>
          <button onClick={onClickCreateSave}>Save</button>
          <button onClick={onClickCreateCancel}>Cancel</button>
          <button disabled className='inactive'>Delete</button>
        </div>

      </div>
    )
  };
  // ***EDIT MODE***
  const displayEditMode = () => {
    return (
      <div className="item-master">
        <div className="row">
          <span>Category Name:</span>
          <input type="text" value ={name} onChange={nameOnChange} />
          {/* <ListView
          columnKeys={["itemNumber", "name", "description"]}
          columnNames={["Item #", "Name", "Description"]}
          componentDisplay={categorySearchDisplay}
          setComponentDisplay={setCategorySearchDisplay}
        // rowEnterFunction={ }
        /> */}
        </div>
        <div className="row">
          Category Id: {categoryId}
        </div>
        <div className="pop-up-dialog" style={{ display: deleteDisplay }}>
          Are you sure you want to delete this category? <br />
          <span style={{ color: "red" }}>{name}  </span> <br />
          This action cannot be undone.<br />
          <button onClick={onClickConfirmDelete}>Delete Item</button>
          <button onClick={onClickCancelDelete}>Cancel</button>
        </div>

        <div className="row">
          <button disabled onClick={onClickView}>View</button>
          <button disabled onClick={onClickEdit}>Edit</button>
          <button disabled onClick={onClickCreate}>Create</button>
          <button onClick={onClickEditSave} >Save</button>
          <button onClick={onClickEditCancel}>Cancel</button>
          <button onClick={onClickDelete}>Delete</button>
        </div>


      </div>
    )
  }
  //run functions


  //useEffect

  useEffect(() => {

    const asyncSetCategories = async () => {
      setCategoryList(await getAllCategories());
    };

    setSelectedCat("categories");
    try {
      asyncSetCategories();


    } catch (error) {
      throw error
    }
    //category of the Admin app that is.

    // verifyToken(user.token);


  }, []);


  return (
    <div className="admin-body">
      {chooseDisplayMode()}
    </div>
  );
};

export default Categories;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
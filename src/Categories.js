import search from './images/search.png'
import { useState } from 'react';
import Loading from './Loading'
import { useEffect } from 'react';
import { getAllItems, getAllCategories, createItem, updateItem, removeItem } from './api/index.js';
import ListExchange from './ListExchange';
import ListView from './ListView';

function Categories({ user, setSelectedCat }) {

  //component states

  const [searchDropdownItems, setSearchDropdownItems] = useState(null);
  const [mode, setMode] = useState('view');
  const [itemId, setItemId] = useState(null);
  const [isDropdownHover, setIsDropdownHover] = useState(false);
  const [itemSearchDisplay, setItemSearchDisplay] = useState("none");
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [taxable, setTaxable] = useState(false);
  const [status, setStatus] = useState("active");
  const [type, setType] = useState('stock');
  const [webstoreStatus, setWebstoreStatus] = useState("inactive");
  const [categoryList, setCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modifyCategoriesDisplay, setModifyCategoriesDisplay] = useState("none");
  const [deleteDisplay, setDeleteDisplay] = useState("none")

  //wrapper set state functions


  const setModeCreate = () => {
    setMode("create");
  }

  const resetFieldStates = () => {
    setCost(0);
    setPrice(0);
    setDescription("");

    setName("");
    setStatus("active");
    setType("stock");
    setWebstoreStatus("inactive");
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
    setModeEdit();
  }

const onClickCreateSave = async () => {
  try {
    //requirements

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

  setSearchDropdownItems(null);


};
const onClickSearchItem = async () => {
  setItemSearchDisplay("block");
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

    // await removeItem(user.token, itemId);
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
};
const descriptionOnChange = (e) => {
  setDescription(e.target.value);
};
const costOnChange = (e) => {
  setCost(Number(e.target.value));
};
const priceOnChange = (e) => {
  setPrice(Number(e.target.value));
};
const taxableOnChange = (e) => {
  setTaxable(e.target.value);
};
const statusOnChange = (e) => {
  setStatus(e.target.value);
};
const typeOnChange = (e) => {
  setType(e.target.value);
};
const webstoreStatusOnChange = (e) => {
  setWebstoreStatus(e.target.value);
};
// end of onChange functions

// helper functions

const printCategories = () => {
  return <div className="view-categories">
    {categories.map((category => {
      return <div className="row" key={category.id}>
        {category.name}
      </div>
    }))}
  </div>
}
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
        <span>Item #:</span>
        <img className='search-icon' src={search} alt="Search Button" onClick={onClickSearchItem} />
        {displaySearchDropdown(searchDropdownItems)}
        {/* <ListView
          columnKeys={["itemNumber", "name", "description"]}
          columnNames={["Item #", "Name", "Description"]}
          componentDisplay={itemSearchDisplay}
          setComponentDisplay={setItemSearchDisplay}
        // rowEnterFunction={ }
        /> */}
      </div>
      <div className="row">
        <span>Item Name:</span> {name}
      </div>
      <div className="row">
        <span>Item Description:</span> {description}
      </div>
      <div className="row">
        <span>Type: </span> {type}
      </div>
      <div className="row">
        <span>Item Status: </span> {status}
      </div>
      <div className="row">
        <span>Cost:</span> {cost}
      </div>
      <div className="row">
        <span>Price:</span> {price}
      </div>
      <div className="row">
        <span>Webstore Status: </span> {webstoreStatus}
      </div>
      <div className="row">
        <button>View Categories</button>
        {printCategories()}
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
        <span>Item #:</span>
      </div>
      <div className="row">
        <span>Item Name:</span>
        <input type="text" value={name} onChange={nameOnChange} />
      </div>
      <div className="row">
        <span>Item Description:</span>
        <input type="text-box" value={description} onChange={descriptionOnChange} />
      </div>
      <div className="row">
        <span>Type: </span>
        <select defaultValue={type} onChange={typeOnChange}>
          <option>Stock</option>
          <option value="dropship">Dropship</option>
          <option value="variable">Variable</option>
        </select>
      </div>
      <div className="row">
        <span>Item Status: </span>
        <select defaultValue={status} onChange={statusOnChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="row">
        <span>Cost:</span>
        <input type="number" value={cost} onChange={costOnChange} />
      </div>
      <div className="row">
        <span>Price:</span>
        <input type="number" value={price} onChange={priceOnChange} />
      </div>
      <div className="row">
        <span>Taxable?</span>
        <input type="checkbox" value={taxable} onChange={taxableOnChange} />
      </div>
      <div className="row">
        <span>Webstore Status: </span>
        <select defaultValue={webstoreStatus} onChange={webstoreStatusOnChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>
      <div className="row">
        <ListExchange
          inputList={categoryList}
          outputList={categories}
          setOutputList={setCategories}
          componentDisplay={modifyCategoriesDisplay}
          setComponentDisplay={setModifyCategoriesDisplay}
        />
      </div>
      <div className="row">
        <button disabled className='inactive'>View</button>
        <button disabled className='inactive'>Edit</button>
        <button disabled className='inactive'>Create</button>
        <button onClick={onClickCreateSave}>Save</button>
        <button onClick={onClickCreateCancel}>Cancel</button>
        <button disabled className="inactive">Delete</button>

      </div>
    </div>
  )
};
// ***EDIT MODE***
const displayEditMode = () => {
  return (
    <div className="item-master">
      <div className="row">
        <span>Item #:</span>

      </div>
      <div className="row">
        <span>Item Name:</span>
        <input type="text" value={name} onChange={nameOnChange} />
      </div>
      <div className="row">
        <span>Item Description:</span>
        <input type="text-box" value={description} onChange={descriptionOnChange} />
      </div>
      <div className="row">
        <span>Type: </span>
        <select defaultValue={type}>
          <option>Stock</option>
          <option value="dropship">Dropship</option>
          <option value="variable">Variable</option>
        </select>
      </div>
      <div className="row">
        <span>Item Status: </span>
        <select defaultValue={status} onChange={statusOnChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="row">
        <span>Cost:</span>
        <input type="number" value={cost} onChange={costOnChange} />
      </div>
      <div className="row">
        <span>Price:</span>
        <input type="number" value={price} onChange={priceOnChange} />
      </div>
      <div className="row">
        <span>Webstore Status: </span>
        <select defaultValue={webstoreStatus} onChange={webstoreStatusOnChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>
      <div className="row">
        <button>Modify Categories</button>
      </div>
      <div className="row">
        <button disabled className="inactive">View</button>
        <button disabled className='inactive'>Edit</button>
        <button disabled className='inactive'>Create</button>
        <button onClick={onClickEditSave}>Save</button>
        <button onClick={onClickEditCancel}>Cancel</button>
        <button onClick={onClickDelete}>Delete</button>

      </div>
      <div className="pop-up-dialog" style={{ display: deleteDisplay }}>
        Are you sure you want to delete this item? <br />
        This action cannot be undone.<br />
        <button onClick={onClickConfirmDelete}>Delete Item</button>
        <button onClick={onClickCancelDelete}>Cancel</button>
      </div>
    </div>
  )
}
//run functions


//useEffect

useEffect(() => {



  setSelectedCat("categories");
  //category of the Admin app that is.

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
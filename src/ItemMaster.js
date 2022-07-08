import search from './images/search.png'
import { useState } from 'react';
import Loading from './Loading'
import { useEffect } from 'react';
import { getAllItems, getAllCategories, createItem, updateItem, removeItem, getCategoriesOfItem } from './api/index.js';
import ListExchange from './ListExchange';
import ListView from './ListView';

function ItemMaster({ user, setSelectedCat, verifyToken }) {

  //component states

  const [allItems, setAllItems] = useState(null);
  const [searchDropdownItems, setSearchDropdownItems] = useState(null);
  const [mode, setMode] = useState('view');
  const [itemNumber, setItemNumber] = useState('');
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
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesDisplay, setCategoriesDisplay] = useState("none");
  const [deleteDisplay, setDeleteDisplay] = useState("none")

  //wrapper set state functions

  const setItemNumberWrapper = async (value) => {
    setItemNumber(value);
  };
  const setModeCreate = () => {
    setMode("create");
  }
  const setIsLoadingTrue = () => {
    setIsLoading(true);
  }
  const setIsLoadingFalse = () => {
    setIsLoading(false);
  };

  const resetFieldStates = () => {
    setCost(0);
    setPrice(0);
    setDescription("");
    setItemNumber("");
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
    ///
  }


  const setIsLoadingFalseAsync = async () => {
    setIsLoadingFalse();
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
    const targetItem = allItems.find(item => item.itemNumber === itemNumber);
    if (typeof (targetItem) === "object") {
      setName(targetItem.name);
      setDescription(targetItem.description);
      setCost(targetItem.cost);
      setPrice(targetItem.price);
      setItemId(targetItem.id);
      setModeEdit();
    }
  }
  const onClickCreateSave = async () => {
    try {
      //requirements

      if (allItems.some((item) => {
        if (item.itemNumber === itemNumber) { return true } else { return false };
      })) {
        throw new Error("itemNumber already exists.");
      }
      if (itemNumber.length < 3) {
        throw new Error("itemNumber length is less than three");
      };
      if (!user.token) {
        throw new Error("user token missing.", user);
      };
      const newItem = await createItem(user.token, { itemNumber, name, description, cost, price, status, webstoreStatus, type, taxable, categories });
      //the above fetch is failing ***FIX***
      setAllItems(await getAllItems(user.token));


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

      if (!allItems.some((item) => {
        if (item.itemNumber === itemNumber) { return true } else { return false };
      })) {
        throw new Error("itemNumber could not be found.");
      };
      if (!user.token) {
        throw new Error("user token missing.", user);
      };
      const newItem = await updateItem(user.token, { itemId, name, description, cost, price, status, webstoreStatus, type, taxable, categories });
      //the above fetch is failing ***FIX***

      setAllItems(await getAllItems(user.token));


    }
    catch (error) { throw error }
    // fetch()
    //add new item to db
    //return to view item
    setModeView();
  };
  const proccessViewItem = async (itemNumber) => {
    try {
      const targetItem = allItems.find(item => item.itemNumber === itemNumber);
      if (typeof (targetItem) === "object") {
        const categoriesResp = await getCategoriesOfItem(targetItem.id);
        console.log('categoriesResp: ', categoriesResp)
        if (!!categoriesResp) {
          const resultCategories = categoriesResp.map((categoryItem) => {
            return categoryList.find(category => category.id === categoryItem.categoryId)
          });
          console.log('resultCategories:', resultCategories)
          setCategories(resultCategories);
        }
        setItemNumber(itemNumber);
        setName(targetItem.name);
        setDescription(targetItem.description);
        setCost(targetItem.cost);
        setPrice(targetItem.price);
      };
    } catch (error) {
      throw error;
    }
  };
  const onClickView = async () => {
    try {
      await proccessViewItem(itemNumber);
    } catch (error) {
      throw error;
    }
  };
  const onClickItemNumberDropdown = (e) => {
    proccessViewItem(e.target.textContent);
    
    setSearchDropdownItems(null);
  };
  const onClickSearchItem = async () => {
    setItemSearchDisplay("block");
  };
  const onClickCategories = (e) => {
    console.log('clicked')
    if(mode !== "view") {
    setCategoriesDisplay("flex");
    } else {
      setCategoriesDisplay("block");
    }
  };
  const onClickEditCancel = () => {
    const targetItem = allItems.find(item => item.itemNumber === itemNumber);
    if (typeof (targetItem) === "object") {
      setName(targetItem.name);
      setDescription(targetItem.description);
      setCost(targetItem.cost);
      setPrice(targetItem.price);
      setModeView();
    };
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

      await removeItem(user.token, itemId);
      setDeleteDisplay('none');
      setAllItems(await getAllItems(user.token));
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

  const itemNumberOnChange = (e) => {
    setItemNumber(e.target.value.trim().toUpperCase());

    try {
      const itemNumberQuery = e.target.value.trim().toUpperCase();
      if (itemNumberQuery.length >= 3 && Array.isArray(allItems)) {
        //search db for item numbers
        //likely using poor async form here
        const previewList = allItems.filter(item =>
          item.itemNumber.substring(0, itemNumberQuery.length) === itemNumberQuery
        );

        setSearchDropdownItems(previewList);
      };
      if (itemNumberQuery.length < 3) {
        setSearchDropdownItems(null);
      };
    }
    catch (error) {
      console.error(error);
    }
  };
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

  const displayLoading = (isLoading) => {
    if (isLoading) {
      return (
        <Loading />
      )
    } else {
      return
    }
  };
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
  //   return <div className="modify-categories" style={{"display":categoriesDisplay}}>
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
    if (Array.isArray(itemList) && Array.isArray(allItems)) {
      return (
        <div className='search-dropdown' onMouseEnter={searchDropDownOnMouseEnter} onMouseLeave={searchDropDownOnMouseLeave}>
          {itemList.map(item => {
            return (
              <div className="search-dropdown-row" onClick={onClickItemNumberDropdown} key={item.id}>
                {item.itemNumber}
              </div>
            )
          })}
        </div>
      )
    } else return
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
          <input type="text" onChange={itemNumberOnChange} onKeyDown={onClickEsc} onBlur={itemNumberOnBlur} value={itemNumber} />
          <img className='search-icon' src={search} alt="Search Button" onClick={onClickSearchItem} />
          {displaySearchDropdown(searchDropdownItems)}
          <ListView
            inputList={allItems}
            columnKeys={["itemNumber", "name", "description"]}
            columnNames={["Item #", "Name", "Description"]}
            componentDisplay={itemSearchDisplay}
            setComponentDisplay={setItemSearchDisplay}
          // rowEnterFunction={ }
          />
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
          <button onClick={onClickCategories}>View Categories</button>
          <ListView
            inputList={categories}
            columnKeys={['name']}
            columnNames={['Name']}
            componentDisplay={categoriesDisplay}
            setComponentDisplay={setCategoriesDisplay}
          />
          {/* { inputList, columnKeys, columnNames, componentDisplay, setComponentDisplay, rowEnterFunction } */}
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
          <input type="text" value={itemNumber} onChange={itemNumberOnChange} />
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
          <button onClick={onClickCategories}>Select Categories</button>
          <ListExchange
            inputList={categoryList}
            outputList={categories}
            setOutputList={setCategories}
            componentDisplay={categoriesDisplay}
            setComponentDisplay={setCategoriesDisplay}
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
          {itemNumber}
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
          <button onClick={onClickCategories}>Modify Categories</button>
          <ListExchange
            inputList={categoryList}
            outputList={categories}
            setOutputList={setCategories}
            componentDisplay={categoriesDisplay}
            setComponentDisplay={setCategoriesDisplay}
          />
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
          <span style={{ color: "red" }}>{itemNumber}  <br />
            {name} </span> <br />
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
    const fetchAllItems = async () => {
      const result_getAllItems = await getAllItems(user.token);

      setAllItems(result_getAllItems);
    };
    const fetchAllCategories = async () => {
      const result_getAllItems = await getAllCategories();

      setCategoryList(result_getAllItems);
    }
    if (!!user) {
      // verifyToken(user.token);
      fetchAllItems();
      fetchAllCategories();
    }

    setSelectedCat("item-master");
    //category of the Admin app that is.

  }, []);


  return (
    <div className="admin-body">
      {chooseDisplayMode()}
      {displayLoading(isLoading)}
    </div>
  );
};

export default ItemMaster;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
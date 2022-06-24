import search from './images/search.png'
import { useState } from 'react';
import Loading from './Loading'
import { useEffect } from 'react';
import { getAllItems, getAllCategories, createItem } from './api/index.js';
import { getItemByItemNumber } from './api/index';
import ListExchange from './ListExchange';

function ItemMaster({ setSelectedCat }) {

  //component states

  const [allItems, setAllItems] = useState(null);
  const [searchDropdownItems, setSearchDropdownItems] = useState(null);
  const [mode, setMode] = useState('view');
  const [itemNumber, setItemNumber] = useState('');
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
  const [modifyCategoriesDisplay, setModifyCategoriesDisplay] = useState("none");

  //wrapper set state functions

  const setModeCreate = () => {
    setMode("create");
  }
  const setIsLoadingTrue = () => {
    setIsLoading(true);
  }
  const setIsLoadingFalse = () => {
    setIsLoading(false);
  }
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
  }
  const onClickCreate = () => {
    //reset all states to default
    resetFieldStates();
    setModeCreate();
  }

  const onClickEdit = () => {
    setModeEdit();
  }

  const setIsLoadingFalseAsync = async () => {
    setIsLoadingFalse();
  }

  //On Click Functions
  const onClickSave = async () => {
    try {
      //requirements
      if (allItems.some((item) => {
        if(item.itemNumber === itemNumber) { return true } else { return false };
      })) {
        throw new Error("itemNumber already exists.");
      }
      if (itemNumber.length < 3) {
        throw new Error("itemNumber length is less than three");
      }
      const newItem = await createItem({itemNumber, name, description, cost, price, status, webstoreStatus, type, taxable, categories});
      console.log("new item created: ", newItem);

    }
    catch (error) { throw error }
    // fetch()
    //add new item to db
    //return to view item
    setModeView();
  }
  const onClickView = () => {
    //
    const targetItem = allItems.find(item => item.itemNumber === itemNumber);
    if (typeof (targetItem) === "object") {
      setName(targetItem.name);
      setDescription(targetItem.description);
      setCost(targetItem.cost);
      setPrice(targetItem.price);
      setName(targetItem.name);
    }
  };
  const onClickModifyCategories = (e) => {
    setModifyCategoriesDisplay("flex");
  };

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
        console.log("Preview list:", previewList);
        setSearchDropdownItems(previewList);
      }
    }
    catch (error) {
      console.error(error);
    }
  };
  const nameOnChange = (e) => {
    setName(e.target.value);
  };
  const descriptionOnChange = (e) => {
    setDescription(e.target.value);
  };
  const costOnChange = (e) => {
    setCost(e.target.value);
  };
  const priceOnChange = (e) => {
    setPrice(e.target.value);
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
    if (Array.isArray(itemList) && Array.isArray(allItems)) {
      return (
        <div className='search-dropdown'>
          {itemList.map(item => {
            return (
              <div className="search-dropdown-row" key={item.id}>
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
          <input type="text" onChange={itemNumberOnChange} value={itemNumber} />
          <img className='search-icon' src={search} alt="Search Button" />
          {/* {displaySearchDropdown(searchDropdownItems)} */}
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
          <button onClick={onClickView}>View Item</button>
          <button onClick={onClickCreate}>Create New Item</button>
          <button onClick={onClickEdit}>Edit</button>
          <button className='inactive'>Save</button>

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
          <button onClick={onClickModifyCategories}>Modify Categories</button>
          <ListExchange inputList={categoryList} outputList={categories} setOutputList={setCategories} componentDisplay={modifyCategoriesDisplay} setComponentDisplay={setModifyCategoriesDisplay} />
        </div>
        <div className="row">
          <button className='inactive'>Create New Item</button>
          <button className='inactive'>Edit</button>
          <button onClick={onClickSave}>Save</button>

        </div>
      </div>
    )
  }
  const displayEditMode = () => {
    return (
      <div className="item-master">
        <div className="row">
          <span>Item #:</span>
          <input type="text" value={itemNumber} />
        </div>
        <div className="row">
          <span>Item Name:</span>
          <input type="text" value={name} />
        </div>
        <div className="row">
          <span>Item Description:</span>
          <input type="text-box" value={description} />
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
          <button className='inactive'>Create New Item</button>
          <button className='inactive'>Edit</button>
          <button onClick={onClickSave}>Save</button>

        </div>
      </div>
    )
  }
  //run functions


  //useEffect

  useEffect(() => {
    const fetchAllItems = async () => {
      const result_getAllItems = await getAllItems();
      console.log("resultGetAllItems: ", result_getAllItems);
      setAllItems(result_getAllItems);
    };
    const fetchAllCategories = async () => {
      const result_getAllItems = await getAllCategories();
      console.log("resultGetAllCategories: ", result_getAllItems);
      setCategoryList(result_getAllItems);
    }
    fetchAllItems();
    fetchAllCategories();


    setSelectedCat("item-master");
    //category of the Admin app that is.

  }, []);


  return (
    <div className="admin-body">
      {chooseDisplayMode()}
      {displayLoading(isLoading)}
    </div>
  );
}

export default ItemMaster;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
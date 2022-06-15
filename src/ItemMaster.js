import search from './images/search.png'
import { useState } from 'react';
import Loading from './Loading'

function ItemMaster({ setSelectedCat }) {

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

  const setModeCreate = () => {
    setMode("create");
  }
  const setIsLoadingTrue = () => {
    setIsLoading(true);
  }
  const setIsLoadingFalse = () => {
    setIsLoading(false);
  }
  const onClickCreate = () => {
    setModeCreate();
  }
  const setModeEdit = () => {
    setMode("edit");
  }
  const onClickEdit = () => {
    setModeEdit();
  }
  const setModeView = () => {
    setMode("view");
  }
  const setIsLoadingFalseAsync = () => {
    setTimeout(()=>{
      setIsLoadingFalse();
    }, 2000);
  }
  const onClickSave = () => {
    //see if item# exists
    // fetch()
    //add new item to db
    //return to view item
     setModeView();
  }

  //onChange functions

  const itemNumberOnChange = (e) =>{
    setItemNumber(e.target.value);
  };
  const nameOnChange = (e) =>{
    setName(e.target.value);
  };
  const descriptionOnChange = (e) =>{
    setDescription(e.target.value);
  };
  const costOnChange = (e) =>{
    setCost(e.target.value);
  };
  const priceOnChange = (e) =>{
    setPrice(e.target.value);
  };
  const taxableOnChange = (e) =>{
    setTaxable(e.target.value);
  };
  const statusOnChange = (e) =>{
    setStatus(e.target.value);
  };
  const typeOnChange = (e) =>{
    setType(e.target.value);
  };
  const webstoreStatusOnChange = (e) =>{
    setWebstoreStatus(e.target.value);
  };
// end of onChange functions

// helper functions

const displayLoading = (isLoading) => {
  if(isLoading) {
    return (
      <Loading />
    )
  } else {
    return
  }
}

// displays

  const chooseDisplayMode = () => {
    if(mode === 'view') {
      return displayViewMode();
    } else if(mode === 'create') {
      return displayCreateMode();
    } else if(mode === 'edit') {
      return displayEditMode();
    }
  }
//      VIEW MODE   //
  const displayViewMode = () => {
    return (
      <div className="item-master">
      <div className="row">
          <span>Item #:</span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>Item Name:</span>
        </div>
        <div className="row">
          <span>Item Description:</span>
        </div>
        <div className="row">
          <span>Type: </span>
          <span>Stock</span>
        </div>
        <div className="row">
          <span>Item Status: </span>
        </div>
        <div className="row">
          <span>Cost:</span>
        </div>
        <div className="row">
          <span>Price:</span>
        </div>
        <div className="row">
          <span>Webstore Status: </span>
        </div>
        <div className="row">
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
          <input type="text" value={itemNumber} onChange={itemNumberOnChange}/>
        </div>
        <div className="row">
          <span>Item Name:</span>
          <input type="text" value={name} onChange={nameOnChange} />
        </div>
        <div className="row">
          <span>Item Description:</span>
          <input type="text-box" value={description} onChange={descriptionOnChange}/>
        </div>
        <div className="row">
          <span>Type: </span>
          <select defaultValue={type} onChange={typeOnChange}>
            <option selected>Stock</option>
            <option value="dropship">Dropship</option>
            <option value="variable">Variable</option>
          </select>
        </div>
        <div className="row">
          <span>Item Status: </span>
          <select defaultValue={status} onChange={statusOnChange}>
            <option selected value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="row">
          <span>Cost:</span>
          <input type="number" value={cost} onChange={costOnChange} />
        </div>
        <div className="row">
          <span>Price:</span>
          <input type="number" value={price} onChange={priceOnChange}/>
        </div>
        <div className="row">
          <span>Taxable?</span>
          <input type="checkbox" value={taxable} onChange={taxableOnChange}/>
        </div>
        <div className="row">
          <span>Webstore Status: </span>
          <select defaultValue={webstoreStatus} onChange={webstoreStatusOnChange}>
            <option value="active">Active</option>
            <option selected value="inactive">Inactive</option>
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
  const displayEditMode = () => {
    return (
      <div className="item-master">
      <div className="row">
          <span>Item #:</span>
          <input type="text" value={itemNumber}/>
        </div>
        <div className="row">
          <span>Item Name:</span>
          <input type="text" value={name} />
        </div>
        <div className="row">
          <span>Item Description:</span>
          <input type="text-box" value={description}/>
        </div>
        <div className="row">
          <span>Type: </span>
          <select defaultValue={type}>
            <option selected>Stock</option>
            <option value="dropship">Dropship</option>
            <option value="variable">Variable</option>
          </select>
        </div>
        <div className="row">
          <span>Item Status: </span>
          <select defaultValue={status} onChange={statusOnChange}>
            <option selected value="active">Active</option>
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
            <option selected value="inactive">Inactive</option>
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

  setSelectedCat("item-master");

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
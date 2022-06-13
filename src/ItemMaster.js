import search from './images/search.png'
import { useState } from 'react';

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

  const setModeCreate = () => {
    setMode("create");
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
  const onClickSave = () => {
    setModeView();
  }

  //onChange functions

  const itemNumberOnChange = (e) =>{
    setItemNumber(e.target.value);
  }

  const chooseDisplayMode = () => {
    if(mode === 'view') {
      return displayViewMode();
    } else if(mode === 'create') {
      return displayCreateMode();
    } else if(mode === 'edit') {
      return displayEditMode();
    }
  }

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
  const displayCreateMode = () => {
    return (
      <div className="item-master">
      <div className="row">
          <span>Item #:</span>
          <input type="text" value={itemNumber} onChange={itemNumberOnChange}/>
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
          <select defaultValue={status}>
            <option selected value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="row">
          <span>Cost:</span>
          <input type="number" value={cost} />
        </div>
        <div className="row">
          <span>Price:</span>
          <input type="number" value={price} />
        </div>
        <div className="row">
          <span>Taxable?</span>
          <input type="checkbox" value={taxable} />
        </div>
        <div className="row">
          <span>Webstore Status: </span>
          <select defaultValue={webstoreStatus}>
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
          <select defaultValue={status}>
            <option selected value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="row">
          <span>Cost:</span>
          <input type="number" value={cost} />
        </div>
        <div className="row">
          <span>Price:</span>
          <input type="number" value={price} />
        </div>
        <div className="row">
          <span>Webstore Status: </span>
          <select defaultValue={webstoreStatus}>
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
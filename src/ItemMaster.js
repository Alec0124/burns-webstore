import search from './images/search.png'
import { useState } from 'react';

function ItemMaster({ setSelectedCat }) {

  const [mode, setMode] = useState('view');

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
          <input type="text" />
        </div>
        <div className="row">
          <span>Item Name:</span>
          <input type="text" />
        </div>
        <div className="row">
          <span>Item Description:</span>
          <input type="text-box" />
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
          <input type="number" />
        </div>
        <div className="row">
          <span>Price:</span>
          <input type="number" />
        </div>
        <div className="row">
          <span>Webstore Status: </span>

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
          <input type="text" />
        </div>
        <div className="row">
          <span>Item Name:</span>
          <input type="text" />
        </div>
        <div className="row">
          <span>Item Description:</span>
          <input type="text-box" />
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
          <input type="number" />
        </div>
        <div className="row">
          <span>Price:</span>
          <input type="number" />
        </div>
        <div className="row">
          <span>Webstore Status: </span>

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
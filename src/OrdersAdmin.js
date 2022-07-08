import search from './images/search.png'
import { useState } from 'react';
import { useEffect } from 'react';

function OrdersAdmin({ setSelectedCat, verifyToken }) {

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
          <span>Order #:</span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>Created Time Stamp:</span>
        </div>
        <div className="row">
          <span>Order Date:</span>
        </div>
        <div className="row">
          <span>Client Id: </span>
        </div>
        <div className="row">
          <span>Order Status: </span>
        </div>
        <div className="row">
          <div>Line Items</div>
        </div>

        <div className="row">
          <button onClick={onClickCreate}>Create New Order</button>
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
          <span>Order #:</span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>Created Time Stamp:</span>
        </div>
        <div className="row">
          <span>Order Date:</span>
        </div>
        <div className="row">
          <span>Client Id: </span>
        </div>
        <div className="row">
          <span>Order Status: </span>
        </div>
        <div className="row">
          <div>Line Items</div>
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
          <span>Order #:</span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>Created Time Stamp:</span>
        </div>
        <div className="row">
          <span>Order Date:</span>
        </div>
        <div className="row">
          <span>Client Id: </span>
        </div>
        <div className="row">
          <span>Order Status: </span>
        </div>
        <div className="row">
          <div>Line Items</div>
        </div>
        <div className="row">
          <button className='inactive'>Create New Item</button>
          <button className='inactive'>Edit</button>
          <button onClick={onClickSave}>Save</button>

        </div>
        </div>
    )
  }
  useEffect(()=>{
    setSelectedCat("orders");
  },[])

  return (
    <div className="admin-body">
      {chooseDisplayMode()}
    </div>
  );
}

export default OrdersAdmin;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
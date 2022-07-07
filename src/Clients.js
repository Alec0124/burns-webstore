import search from './images/search.png'
import { useState } from 'react';
import { useEffect } from 'react';

function Clients({ setSelectedCat }) {

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
    if (mode === 'view') {
      return displayViewMode();
    } else if (mode === 'create') {
      return displayCreateMode();
    } else if (mode === 'edit') {
      return displayEditMode();
    }
  }

  const displayViewMode = () => {
    return (
      <div className="item-master">
        <div className="row">
          <span>Client Id: </span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>First Name: </span>
        </div>
        <div className="row">
          <span>Last Name: </span>
        </div>
        <div className="row">
          <span>Email Address: </span>
        </div>
        <div className="row">
          <span>Address 1: </span>
        </div>
        <div className="row">
          <span>Address 2: </span>
        </div>
        <div className="row">
          <span>Address 3: </span>
        </div>
        <div className="row">
          <span>City: </span>
        </div>
        <div className="row">
          <span>State: </span>
        </div>
        <div className="row">
          <span>Zip Code: </span>
        </div>
        <div className="row">
          <span>Phone Number: </span>
        </div>
        <div className="row">
          <span>Alt. Phone Number: </span>
        </div>

        <div className="row">
          <button onClick={onClickCreate}>Create New Client Record</button>
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
          <span>Client Id: </span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>First Name: </span>
        </div>
        <div className="row">
          <span>Last Name: </span>
        </div>
        <div className="row">
          <span>Email Address: </span>
        </div>
        <div className="row">
          <span>Address 1: </span>
        </div>
        <div className="row">
          <span>Address 2: </span>
        </div>
        <div className="row">
          <span>Address 3: </span>
        </div>
        <div className="row">
          <span>City: </span>
        </div>
        <div className="row">
          <span>State: </span>
        </div>
        <div className="row">
          <span>Zip Code: </span>
        </div>
        <div className="row">
          <span>Phone Number: </span>
        </div>
        <div className="row">
          <span>Alt. Phone Number: </span>
        </div>

        <div className="row">
          <button className='inactive' >Create New Client Record</button>
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
          <span>Client Id: </span>
          <input type="text" />
          <img className='search-icon' src={search} alt="Search Button" />
        </div>
        <div className="row">
          <span>First Name: </span>
        </div>
        <div className="row">
          <span>Last Name: </span>
        </div>
        <div className="row">
          <span>Email Address: </span>
        </div>
        <div className="row">
          <span>Address 1: </span>
        </div>
        <div className="row">
          <span>Address 2: </span>
        </div>
        <div className="row">
          <span>Address 3: </span>
        </div>
        <div className="row">
          <span>City: </span>
        </div>
        <div className="row">
          <span>State: </span>
        </div>
        <div className="row">
          <span>Zip Code: </span>
        </div>
        <div className="row">
          <span>Phone Number: </span>
        </div>
        <div className="row">
          <span>Alt. Phone Number: </span>
        </div>

        <div className="row">
          <button className='inactive' >Create New Client Record</button>
          <button className='inactive'>Edit</button>
          <button onClick={onClickSave}>Save</button>

        </div>
      </div>
    )
  }
  useEffect(()=>{
    setSelectedCat("clients");
  },[])

  return (
    <div className="admin-body">
      {chooseDisplayMode()}
    </div>
  );
}

export default Clients;
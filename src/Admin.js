import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GeneralAdmin from './GeneralAdmin';
import ItemMaster from './ItemMaster';
import OrdersAdmin from './OrdersAdmin';
import Clients from './Clients';

function Admin() {

  const [selectedCat, setSelectedCat] = useState('general');

  const isCatSelected = (catName) => {
    if ((selectedCat === 'general' && catName === 'general')
      || (selectedCat === 'item-master' && catName === 'item-master')
      || (selectedCat === 'orders' && catName === 'orders')
      || (selectedCat === 'clients' && catName === 'clients')
    ) {
      return 'admin-nav-cat selected'
    } else return 'admin-nav-cat';
  }

  return (
    <div className="admin-app">
      <div className="admin-nav">
        <Link to="/admin" className={isCatSelected('general')} >
          General Settings
        </Link>
        <div className="admin-nav-cat">
          Admin Users
        </div>
        <Link to="/admin/item-master" className={isCatSelected('item-master')}>
          Inventory
        </Link>
        <Link to="/admin/orders" className={isCatSelected('orders')} >
          Orders
        </Link>
        <Link to="/admin/clients" className={isCatSelected('clients')}>
          Clients
        </Link>
        <div className="admin-nav-cat">
          Vendors
        </div>
        <div className="admin-nav-cat">
          General Ledger Accounts
        </div>
        <div className="admin-nav-cat">
          Admin Category
        </div>
      </div>

      <Routes>
      <Route path="/" element={<GeneralAdmin setSelectedCat={setSelectedCat} />} />
      <Route path="/item-master" element={<ItemMaster setSelectedCat={setSelectedCat} />} />
      <Route path="/orders" element={<OrdersAdmin setSelectedCat={setSelectedCat} />} />
      <Route path="/clients" element={<Clients setSelectedCat={setSelectedCat} />} />
      </Routes>

    </div >
  );
}

export default Admin;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
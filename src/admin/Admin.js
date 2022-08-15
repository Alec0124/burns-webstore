import { useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import GeneralAdmin from './GeneralAdmin';
import ItemMaster from './ItemMaster';
import OrdersAdmin from './OrdersAdmin';
import Categories from './Categories';
import Clients from './Clients';
import Login from './Login';
import Logout from './Logout';
import { useEffect } from 'react';

function Admin() {

  const navigate = useNavigate();

  const [selectedCat, setSelectedCat] = useState('general');
  const [user, setUser] = useState(undefined);

  const setUserWrapper = async (value) => {
    localStorage.setItem('user', JSON.stringify(value));
    setUser(value);
  };

  const isCatSelected = (catName) => {
    if ((selectedCat === 'general' && catName === 'general')
      || (selectedCat === 'item-master' && catName === 'item-master')
      || (selectedCat === 'orders' && catName === 'orders')
      || (selectedCat === 'clients' && catName === 'clients')
      || (selectedCat === 'categories' && catName === 'categories')
      || (selectedCat === catName)
    ) {
      return 'admin-nav-cat selected'
    } else return 'admin-nav-cat';
  }
  const verifyToken = async (token) => {
    if (typeof (token) !== 'string') {
      throw new Error('missing token');
    }
    const verifiedUser = await fetch('http://localhost:5000/api/verify', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });
    return verifiedUser;
  };
  const verifyTokenWrapper = async (token) => {
    if (!!token) {
      //verify token
      const verifiedUserJson = await verifyToken(token);
      const verifiedUser = await verifiedUserJson.json();
      console.log('verified:', verifiedUser);
      if (verifiedUser.name === 'TokenExpiredError') {
        //throw error and logout
        navigate("/admin/logout", { replace: true });
      };
      if (verifiedUser.user) {
        await setUserWrapper(verifiedUser.user);
      };

      //set localStorage and props state with the retreived user data

    } else {
      //do nothing, no token detected on this render
    };
  };
  const PrintAdminRoot = () => {
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
          <Link to="/admin/categories" className={isCatSelected('categories')} >
            Categories
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
          <Link to="/admin/logout" className="admin-nav-cat" >
            Logout
          </Link>
        </div>

        <Routes>
          <Route exact path="/" element={<GeneralAdmin user={user} setSelectedCat={setSelectedCat} />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route path="/item-master" element={<ItemMaster user={user} setSelectedCat={setSelectedCat} verifyToken={verifyTokenWrapper}/>} />
          <Route path="/categories" element={<Categories user={user} setSelectedCat={setSelectedCat} verifyToken={verifyTokenWrapper} />} />
          <Route path="/orders" element={<OrdersAdmin setSelectedCat={setSelectedCat} verifyToken={verifyTokenWrapper} />} />
          <Route path="/clients" element={<Clients setSelectedCat={setSelectedCat} verifyToken={verifyTokenWrapper} />} />
        </Routes>

      </div >
    );
  };

  const printAdminLogin = () => {
    const localStorageUser = localStorage.getItem("user");
    // const localStorageToken = localStorage.getItem("token");
    if (!localStorageUser) {
      console.log("no local user")
      return <Login user={user} setUser={setUser} />
    } else {
      //add token validation here
      return <PrintAdminRoot />
    }
  };

  useEffect(() => {
    //functions
    const verifyToken = async (token) => {
      if (typeof (token) !== 'string') {
        throw new Error('missing token');
      }
      const verifiedUser = await fetch('http://localhost:5000/api/verify', {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return verifiedUser;
    };
    const verifyTokenWrapper = async (token) => {
      if (!!token) {
        //verify token
        const verifiedUserJson = await verifyToken(token);
        const verifiedUser = await verifiedUserJson.json();
        console.log('verified:', verifiedUser);
        if (verifiedUser.name === 'TokenExpiredError') {
          //throw error and logout
          navigate("/admin/logout", { replace: true });
        };
        if (verifiedUser.user) {
          await setUserWrapper(verifiedUser.user);
        };
  
        //set localStorage and props state with the retreived user data
  
      } else {
        //do nothing, no token detected on this render
      };
    };
    
    try {
      //script

      const tempStorageUser = localStorage.getItem('user');
      if(!tempStorageUser) {} else {

      const tempUser = JSON.parse(tempStorageUser);
      // if(!tempUser.token) {throw new Error('token missing')};
      verifyTokenWrapper(tempUser.token);
    }
  }
    catch (error) {
      throw error;
    }
  }, [])


  //bootOrder, run scripts
  return (<>
    {printAdminLogin()}
  </>)


};



export default Admin;

/*
Store-Header
Store-Body
Store-Footer


admin

*/
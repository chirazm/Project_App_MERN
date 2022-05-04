import './index.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen'
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';

function App() {

  const cart = useSelector(state => state.cart);
  const [siderbarIsOpen, setSiderbarIsOpen] = useState(false);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
      loading: loadingCategories,
      error: errorCategories,
      categories,
  } = productCategoryList;

  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
          <div className="grid-container">
    <header className="row">
      <div>
        <button
          type='button'
          className='open-sidebar'
          onClick={() => setSiderbarIsOpen(true)}
        >
          <i className='fa fa-bars'></i>
        </button>
        <Link className="brand" to="/">Amazona</Link>
      </div>
      <div>
        <SearchBox />
      </div>
      <div>
      <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
      </Link>
        {
          userInfo ? (
            <div className='dropdown'>
            <Link to="#"> 
              {userInfo.name} <i className='fa fa-caret-down'></i> {' '} 
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to="/profile"> User Profile </Link>
              </li>
              <li>
                <Link to="/orderhistory">Order History</Link>
              </li>
              <li>
                <Link to = "#signout" onClick={signoutHandler}> 
                  Sign Out
                </Link>
              </li>
            </ul>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
            <Link to="#seller"> 
              Seller <i  className='fa fa-caret-down'></i>
            </Link>
            <ul className='dropdown-content'>
              <li>
                <Link to="/productlist/seller">Products</Link>
              </li>
              <li>
                <Link to="/orderlist/seller">Orders</Link>
              </li>
            </ul>
          </div>
          )}
          {
            userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <Link to="#admin"> 
                  Admin <i  className='fa fa-caret-down'></i>
                </Link>
                <ul className='dropdown-content'>
                  <li>
                    <Link to="/dashbord">Dashbord</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
      </div>
    </header>
    <aside className= {siderbarIsOpen ? 'open': ''}>
      <ul>
        <li>
          <strong>Categories</strong>
          <button
            onClick={() => setSiderbarIsOpen(false)}
            className="close-sidebar"
            type='button'
          >
            <i className='fa fa-close'></i>
          </button>
        </li>
          {loadingCategories ? (<LoadingBox></LoadingBox>) 
          : errorCategories ? (<MessageBox variant="danger">{errorCategories}</MessageBox>) 
          : (
            categories.map((c) => (
              <li key={c}>
                <Link to={`/search/category/${c}`}
                  onClick={() => setSiderbarIsOpen(false)}
                > {c}
                </Link>
              </li>
            ))
          )}
      </ul>
    </aside>
    <main>
      <Routes>
        <Route path="/" element={< HomeScreen />} exact></Route>
        <Route path="/cart" element={< CartScreen />}></Route>
        <Route path="/cart/:id" element={< CartScreen />}></Route>
        <Route path="/product/:id" element={< ProductScreen/>} exact ></Route>
        <Route path="/product/:id/edit" element={< ProductEditScreen />} exact ></Route>
        <Route path="/signin" element={< SigninScreen />}></Route>
        <Route path="/register" element={< RegisterScreen />}></Route>
        <Route path="/shipping" element={< ShippingAddressScreen />}></Route>
        <Route path="/payment" element={< PaymentMethodScreen />}></Route>
        <Route path="/placeorder" element={< PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={< OrderScreen />}></Route>
        <Route path="/orderhistory" element={< OrderHistoryScreen />}></Route>
        <Route path="/profile" element={ <PrivateRoute> < ProfileScreen /> </PrivateRoute> }></Route>
        <Route path="/productlist" element={ <AdminRoute> < ProductListScreen /> </AdminRoute> } ></Route>
        <Route path="/orderlist" element={ <AdminRoute> < OrderListScreen /> </AdminRoute> } ></Route>
        <Route path="/userlist" element={ <AdminRoute> < UserListScreen /> </AdminRoute> }></Route>
        <Route path="/user/:id/edit" element={ <AdminRoute> < UserEditScreen /> </AdminRoute> }></Route>
        <Route path="/productlist/seller" element={ <SellerRoute> < ProductListScreen /> </SellerRoute> }></Route>
        <Route path="/orderlist/seller" element={ <SellerRoute> < OrderListScreen /> </SellerRoute> }></Route>
        <Route path="/seller/:id" element={ < SellerScreen />}></Route>
        <Route path="/search/name/:name"element={<SearchScreen />} exact></Route>
        <Route path="/search/category/:category"element={<SearchScreen />} exact></Route>
        <Route path="/search/category/:category/name/:name"element={<SearchScreen />} exact></Route>
      </Routes>
   
     <br/><br/><br/><br/><br/><br/>
    </main>
    <footer className="row center">All right reserved</footer>
  </div>
    </BrowserRouter>

  );
}

export default App;

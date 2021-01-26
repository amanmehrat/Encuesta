import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

import allActions from '../action';

const Header = () => {
  const auth = useSelector(state => state.auth.user);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  //if (window.location.pathname.toLowerCase() === '/auth') return null;

  if (isLoggedIn == null) return null;


  const renderLogin = () => {
    const logout = () => {
      dispatch(allActions.userActions.LogoutUser());
    }

    if (isLoggedIn) {
      return [
        <li key="1"><Payment /></li>,
        <li key="2" style={{ margin: "0 10px" }}>Credits : {auth.credits}</li>,
        <li key="3"><button onClick={logout}>Logout</button></li>
      ]
    } else {
      return [
        <li key="1"><Link to="/auth/google">Login with google</Link></li>,
        <li key="2"><Link to="/auth">Login</Link></li>
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={isLoggedIn ? "/surveys" : "/"} className="left brand-logo">Emaily</Link>
        <ul className="right">
          {renderLogin()}
        </ul>
      </div>
    </nav>
  );
}
export default Header;
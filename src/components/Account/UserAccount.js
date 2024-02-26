import React, { useState } from 'react';
import './Account.css';
import { Link } from 'react-router-dom';

import OrderHistory from '../Checkout/OrderHistory';
import Profile from '../User/Profile';
import PasswordUpdate from '../User/PasswordUpdate ';
// const Password = () => <h1>Password Component</h1>;
const Message = () => <h1>Message Component</h1>;

const UserAccount = () => {
  const [component, setComponent] = useState(null);
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (component, link) => {
    setComponent(component);
    setActiveLink(link);
  };

  return (
    <div className="user_account_container">
      <div className="account_sidebar">
        <Link onClick={() => handleClick(<OrderHistory />, 'orders')} className={activeLink === 'orders' ? 'active' : ''}>Orders</Link>
        <Link onClick={() => handleClick(<Profile />, 'profile')} className={activeLink === 'profile' ? 'active' : ''}>Profile</Link>
        <Link onClick={() => handleClick(<PasswordUpdate />, 'PasswordUpdate')} className={activeLink === 'PasswordUpdate' ? 'active' : ''}>Password</Link>
        <Link onClick={() => handleClick(<Message />, 'message')} className={activeLink === 'message' ? 'active' : ''}>Message</Link>
      </div>
      <div className="content">{component ? component : <Profile />}</div>
    </div>
  );
};

export default UserAccount;

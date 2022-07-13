/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../controller';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../../controller';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    history.replace('/login');
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          <img
            className="w-8 h-8 mr-2 rounded-full"
            src={logo}
            alt="userPhoto"
          />
          Khwendnga
        </div>
      </div>
      {user ? (
        <>
          <div className="nav-btn">
            <label for="nav-check">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/Profile">Profile</Link>
            <button
              onClick={handleSignout}
              className="loginBtn ml-4 mr-2 px-6 py-2 text-white bg-normalPurple rounded-md hover:bg-darkPurple"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="nav-links">
          <Link to="/login" className=" ml-4 mr-2  rounded-md ">
            Login
          </Link>
        </div>
      )}
    </div>
  );
}

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../controller';
import { signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { AuthContext } from '../context/auth';
import { useHistory } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
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
    <nav>
      <Link to="/">
        {' '}
        <img class="w-8 h-8 rounded-full" src={logo} alt="userPhoto" />
      </Link>

      <div>
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/chat">Chat</Link>
            <Link to="/grade">Grade</Link>
            <Link to="/profile">Profile</Link>
            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

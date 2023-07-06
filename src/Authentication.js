import React, { useState, useEffect } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link } from 'react-router-dom';

const Authentication = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = firebase.auth();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => {
        console.error('Error logging in with Google:', error);
      });
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
    {user ? (
        <nav>
        <div className='logedin'>
          <div className='links'>
          <Link to='/'>Home</Link>
          <Link to='/settings'>Settings</Link>
          <Link to='/settings'>Nesto</Link>
          </div>
          <div className='logouts'>
          Welcome, {user.displayName}
          <select style={{fontSize:"medium"}} onChange={logout}>
            <option value='1' style={{fontSize:"medium",backgroundColor:'transparent'}}>▼</option>
            <option value='2' style={{fontSize:"medium"}}>Logout</option>
            </select></div>
            </div>
            </nav>
      ) : (
        <div className='notlogin'>
          <div className='login-to-continue'>
          <p>Please login to continue.</p>
          <button onClick={loginWithGoogle}>Login with Google</button>
          </div>
        </div>
      )}
    </>
      );
};

export default Authentication;

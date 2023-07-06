import { useState, useEffect } from 'react';
import Nav from './Authentication'
import firebase from 'firebase/compat/app';

export default function Settings () {
    const [user, setUser] = useState(null)

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        setUser(user);
      });
  
      return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
    }, []);
    return (
        <>
        <Nav></Nav>
        <div className='user'>
            <p>{user?.displayName}</p>
            <p>{user?.email}</p>
            <p>{user?.phoneNumber}</p>
            <img src={user?.photoURL} width='150px' style={{borderRadius:"10px"}} alt='Slika usera'></img>
            </div>
            </>
    )
}
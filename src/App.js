import './App.css';
import StudentCrud from './StudentCrud';
import Authentication from './Authentication';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';


function App() {

  const [user,setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);


  return (
    <Router>

      
      <Routes>
        {user ? 
          <Route path='/' element={
          <>
            <Authentication></Authentication>
            <StudentCrud></StudentCrud>
          </>}
          ></Route>
        :
        <Route path='/' element={<Authentication></Authentication>}></Route>
        }
      </Routes>
    </Router>
  );
}

export default App;
 
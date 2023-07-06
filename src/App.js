import './App.css';
import StudentCrud from './StudentCrud';
import Authentication from './Authentication';
import {Link,BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import Settings from './Settings';


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, []);

  
  return (
    <div className='App'>
    <Router>
    <Routes>
      {user?
      <>        
      <Route path="/" element={
        <>
          <Authentication setUser={setUser} />
          <StudentCrud />
        </>
      } />
      <Route path='/settings' element={<Settings/>}></Route>
      </>
      :
      <Route path="/" element={<Authentication/>}></Route>
    }


    </Routes>
    </Router>
    </div>
  );
}

export default App;

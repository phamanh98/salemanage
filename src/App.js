import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './Components/Pages/login';
import DefaultLayout from './Components/DefaultLayout';
import ErrorPage from './Components/Pages/Error';
// import firebase from 'firebase';

// Configure Firebase.
// const config = {
//   apiKey: 'AIzaSyDjiF92aYIaGpNE9Iqcio6iyOGEbht_Ax8',
//   authDomain: 'coopmartsale.firebaseapp.com',
// };
// firebase.initializeApp(config);

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

//   //
// useEffect(() => {
//   const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
//        if(!user){
//         useNavigate('./login');
//         return;
//        }
//        useNavigate('./*');
//       });
//       return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
//   }, []);

return (
  <div className="App">
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/*" element={<DefaultLayout/>} />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </Router>
  </div>
);
}

export default App;

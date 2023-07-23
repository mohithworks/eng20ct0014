import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { userFun } from './userfun';
import Home from './Home';

function App() {
  const [user, setUser] = useState(null);

  //getting data from authors table in supabse
  useEffect(() => { 
    const fetchCode = async () => {
      const order = await userFun('getAccessToken', {}, {});
      
      if(order.status === 200) {
        console.log(order.data)
        localStorage.setItem('accessCode', JSON.stringify(order.data));

      }else {
        alert("Something went wrong")   
      }
    }
    fetchCode()
  }, [])

  return (
      <div>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
  );
}

export default App;

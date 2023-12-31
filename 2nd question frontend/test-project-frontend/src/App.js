import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Spinner, Flex } from '@chakra-ui/react'
import { userFun } from './userfun';
import Home from './Home';
import Trains from './Trains';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const accessCode = localStorage.getItem('accessCode');
    const fetchCode = async () => {
      
      const res = await fetch('https://bad3-2409-40f2-103c-526f-dda0-3384-5577-6576.ngrok-free.app/api/getToken', {
              method: "POST",
        });

        if(res) {
            const json = await res.json();  
            localStorage.setItem('accessCode', json.access_token);
            console.log(json)
        } else {
            console.log(res);
        }
    }
    !accessCode && fetchCode()
    setLoading(false)
  }, [])

  if(loading === true) {
    return <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
      <Spinner mt={10} />
    </Flex>
  }else {
    return (
        <div>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/trains" element={<Trains />} />
          </Routes>
        </div>
    );

  }
}

export default App;

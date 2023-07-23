import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Flex, Spinner
  } from '@chakra-ui/react'

function Trains() {
  const [loading, setLoading] = useState(true);
  const [trains, setTrains] = useState([]);

  //getting data from authors table in supabse
  useEffect(() => { 
    const accessCode = localStorage.getItem('accessCode');
    console.log(accessCode)
    
    const fetchTrains = async () => {
      
      const res = await fetch('https://bad3-2409-40f2-103c-526f-dda0-3384-5577-6576.ngrok-free.app/api/getTrainDetails', {
            method: 'POST',
            body: JSON.stringify({
                accessCode: accessCode
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });

        if(res) {
            const json = await res.json();  
            setTrains(json.body.message)
            console.log(json.body.message)
            console.log(json)
        } else {
            console.log(res);
        }
    }
    fetchTrains()
    setLoading(false)
  }, [])

  if(loading === true) {
    return <Flex flex={1} justifyContent={'center'} alignItems={'center'}>
      <Spinner mt={10} />
    </Flex>
  }else {
    return (
        <div>
            {
                trains.length > 0 && <Table variant="striped" colorScheme="teal">
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                    <Th>Train Name</Th>
                    <Th>Train Number</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        trains.map((train, index) => {
                            return <Tr key={index}>
                                <Td>{train.trainName}</Td>
                                <Td>{train.trainNumber}</Td>
                            </Tr>
                        }
                        )
                    }
                </Tbody>
                </Table>
            }
        </div>
    );

  }
}

export default Trains;

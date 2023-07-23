import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Flex, Text } from '@chakra-ui/react'

function Home() {
  return (
    <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
        <Text mt={10} variant={'b'} >Mohith Trains</Text>
        <Button mt={10}>
            <Link to="/trains">Get all list of trains here</Link>
        </Button>
    </Flex>
  )
}

export default Home
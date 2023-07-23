import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

function Home() {
  return (
    <div>
        <Button>
            <Link to="/trains">Get all list of trains here</Link>
        </Button>
    </div>
  )
}

export default Home
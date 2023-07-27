import logo from './logo.svg';
import { Button } from '@chakra-ui/react'
import './App.css';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate  = useNavigate();
  
  useEffect(() => {
    const login = localStorage.getItem('login');
    if(!login) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome user
        </p>
       <Button mt={10} onClick={() =>{ localStorage.removeItem('login'); navigate('/login')}}>
        Signout
       </Button>
      </header>
    </div>
  );
}

export default App;

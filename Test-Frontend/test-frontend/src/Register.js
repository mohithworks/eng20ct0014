import { Flex, Text, Input, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Register() {
 const [name, setName] = useState("");
 const [address, setAddress] = useState("");
 const [email, setEmail] = useState("");
 const [pwd, setPwd] = useState("");
 
 const navigate = useNavigate();

 const [btnLoading, setBtnLoading] = useState(false);

 useEffect(() => {
   const login = localStorage.getItem('login');
   if(login) {
     navigate("/");
   }
 }, [navigate]);

 const signup = () => {
    setBtnLoading(true);
    if(name === "" || address === "" || email === "" || pwd === "") {
        alert("Please fill aall the details");
    }else if(name.length < 2) {
        alert("Invalid name");
    }else if(!isNaN(name)) {
        alert("Invalid name");
    }else if(pwd.length < 6) {
        alert("Password is too short");
    }else if(address.length < 2) {
        alert("Invalid address");
    }else {
        const cred = JSON.stringify([
            {
                name,
                address,
                email,
                pwd,
            }
        ])
        localStorage.setItem('register', cred);
        alert("Registered successfully");
        navigate("/login")
    }
    setBtnLoading(false);
 }
  return (
    <Flex flex={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} px={5} py={10}>
      <h1>Register</h1>
      <div style={{ marginTop: 25 }}>
        <Input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} />
        <Input type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} />
        <Input type="text" placeholder='Email/Phone number' onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder='Password' onChange={(e) => setPwd(e.target.value)}/>
        <Button mt={10} isLoading={btnLoading} onClick={signup}>
            Register
        </Button>
      </div>
      <Flex mt={5}>
        <Text>Already have an account?&nbsp;</Text>
        <a style={{ color: 'blue' }} href={'/login'}>Login here</a>
      </Flex>
    </Flex>
  );
}

export default Register;

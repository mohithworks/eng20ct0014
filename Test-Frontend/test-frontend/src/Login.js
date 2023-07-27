import { Flex, Text, Input, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    
    const navigate = useNavigate();
   
    const [btnLoading, setBtnLoading] = useState(false);
   
    useEffect(() => {
        const login = localStorage.getItem('login');
        console.log(login)
        if(login) {
            navigate("/");
        }else {
            navigate('/login')
        }
    }, [navigate]);

    const signin = () => {
       setBtnLoading(true);
       if(email === "" || pwd === "") {
           alert("Please fill aall the details");
       }else {
           const register = localStorage.getItem('register');
           const userData = JSON.parse(register);
           var newData = userData.filter((item) => item.email === email && item.pwd === pwd );
           console.log(newData);
           if(newData.length > 0) {
                const cred = JSON.stringify({
                    email,
                    pwd,
                })
                localStorage.setItem('login', cred);
                alert("Logged in successfully");
                navigate("/")
           }else {
                alert("Inavlid credentials");
           }
       }
       setBtnLoading(false);
    }
    
  return (
    <Flex flex={1} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} px={5} py={10}>
      <h1>Login</h1>
      <div style={{ marginTop: 25 }}>
        <Input type="text" placeholder='Email/Phone number' onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder='Password' onChange={(e) => setPwd(e.target.value)}/>
        <Button mt={10} isLoading={btnLoading} onClick={signin}>
            Login
        </Button>
      </div>
      <Flex mt={5}>
        <Text>Don&apos;t have an account?&nbsp;</Text>
        <a style={{ color: 'blue' }} href={'/register'}>Register here</a>
      </Flex>
    </Flex>
  );
}

export default Login;

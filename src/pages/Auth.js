import React, { useState } from 'react';
import Form from '../components/Form';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

const Login = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [_, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username,
        password,
      });
      if (response.data.message == 'LoggedIn') {
        setCookies('access_token', response.data.token);
        window.localStorage.setItem('userId', response.data.userId);
        navigate('/');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      username={username}
      setusername={setusername}
      password={password}
      setpassword={setpassword}
      title="Login"
      onSubmit={onSubmit}
    />
  );
};
const Register = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/auth/register', {
        username,
        password,
      });
      alert('Registration Successfully !');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Form
      username={username}
      setusername={setusername}
      password={password}
      setpassword={setpassword}
      title="Register"
      onSubmit={onSubmit}
    />
  );
};
export default Auth;

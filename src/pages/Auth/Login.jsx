import React, { useState, useContext } from 'react';
import API from '../../api/axiosConfig';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);

      // Redirect based on role
      if (res.data.user.role === 'STUDENT') navigate('/student');
      else if (res.data.user.role === 'INSTRUCTOR') navigate('/instructor');
      else navigate('/admin');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login to SkillForge</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
               onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

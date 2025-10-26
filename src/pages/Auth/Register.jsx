// import React, { useState } from 'react';
// import API from '../../api/axiosConfig';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'STUDENT' });
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await API.post('/auth/register', form);
//     alert('Registration successful!');
//     navigate('/login');
//   };

//   return (
//     <div className="auth-container">
//       <h2>Register on SkillForge</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Full Name" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//         <select name="role" onChange={handleChange}>
//           <option value="STUDENT">Student</option>
//           <option value="INSTRUCTOR">Instructor</option>
//         </select>
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


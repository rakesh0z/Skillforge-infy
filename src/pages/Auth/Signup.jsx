import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../index.css';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/auth/register", { name, email, password, role });
    alert("Registered successfully!");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="STUDENT">Student</option>
            <option value="INSTRUCTOR">Instructor</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
}
